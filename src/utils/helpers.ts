import { isRouteErrorResponse, SetURLSearchParams } from "react-router-dom";
import { User } from "../features/user/user.types";
import { submitComment } from "../services/apiComment";
import { API_URL } from "../services/apiFeedback";
import {
  BaseCommentType,
  CommentListType,
  CommentThreadEntry,
  ReplyPayload,
  SubmissionDataType,
} from "../types/comment.types";
import {
  ActionType,
  CreateFeedbackActionResultArgs,
  FeedbackActionResult,
  SuggestionType,
} from "../types/feedback.types";
import { ChangeEvent } from "react";
import { NotificationType } from "../ui/BannerNotification";

/* Reusable Fetch Helper */
export async function fetchWrapper<T>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  try {
    const res = await fetch(url, options);

    if (!res.ok) {
      const errorDetails = await res.text();
      throw new Error(errorDetails || `HTTP Error: ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Fetch error: ${error.message}`);
    } else {
      console.error("Unknown error occurred");
    }

    throw error;
  }
}

/*
 The validateUserCredetial func fetches a user from the mock API and validates the provided credentials
 Throws an error if the user is not found or the name does not match
 */
export async function validateUserCredentials(
  name: string,
  username: string
): Promise<User> {
  const userRes = await fetchWrapper<User[]>(
    `${API_URL}/userList?username=${username}`
  );
  const user = userRes[0];

  if (!user) {
    throw new Error("User not found");
  }

  if (user.name !== name) {
    throw new Error("Incorrect name");
  }

  return user;
}

//Format category label
export function formatCategoryLabel(categoryLabel: string): string {
  if (categoryLabel === null) return categoryLabel;

  return categoryLabel.length === 2
    ? categoryLabel.toUpperCase()
    : categoryLabel.charAt(0).toUpperCase() + categoryLabel.slice(1);
}

//Filters a list of feedback entries based on the specified category
export function filterFeedbackByCategory(
  feedbackList: SuggestionType[],
  category: string
): SuggestionType[] {
  return feedbackList.filter(
    (feedbackEntry) => feedbackEntry.category === category
  );
}

//Sort feedback list
export function sortFeedbackList(
  list: SuggestionType[],
  category: string,
  sortByOption: string
): SuggestionType[] {
  console.log("category ", category, "sortByOption ", sortByOption);

  const feedbackList =
    category === "all" ? list : filterFeedbackByCategory(list, category);
  console.log("feedbackList??", feedbackList);

  return [...feedbackList].sort((a, b) => {
    switch (sortByOption) {
      case "mostUpvotes":
        return b.upvotes - a.upvotes;
      case "leastUpvotes":
        return a.upvotes - b.upvotes;
      case "mostComments":
        return b.commentCount - a.commentCount;
      case "leastComments":
        return a.commentCount - b.commentCount;
      default:
        console.warn(`Unexpected sortByOption: "${sortByOption}"`);
        return b.upvotes - a.upvotes; //safe fallback
    }
  });
}

/* Function used by the FeedbackDetailPage action function to handle the submission 
of comments/replies for a specific feedback entry. It updates the backend by creating 
a new comment or reply based on the mode ("comment" or "reply") and increments the comment count. */
export async function postCommentOrReply(
  content: string,
  submissionData: SubmissionDataType,
  actionType: "addComment"
): Promise<FeedbackActionResult<BaseCommentType>> {
  const {
    author,
    mode,
    payload: { commentCount, feedbackId },
  } = submissionData;

  /* Common fields between comment and reply */
  const baseComment: BaseCommentType = {
    feedbackId,
    type: mode,
    parentId: null,
    parentType: null,
    content,
    user: author,
  };

  if (mode === "reply") {
    const parent = (submissionData.payload as ReplyPayload).parent;
    const { author, id, type } = parent;
    baseComment.replyingTo = author;
    baseComment.parentId = id;
    baseComment.parentType = type;
  }

  const response = await submitComment(baseComment, commentCount);
  console.log("res", response);

  // action submission failed
  if (!response.success) {
    return createFeedbackActionResult<BaseCommentType>({
      outcome: "failure",
      actionType,
      submitError: response.error,
    });
  }
  // action submission successful
  return createFeedbackActionResult<BaseCommentType>({
    actionType,
    outcome: "success",
    payload: response.payload,
  });
}

// This function creates a comment thread by associating replies with their respective parent comments
//TO DO: ADD TYPE ANNOTATIONS
export function buildCommentHierarchy(comments: CommentListType) {
  const commentsThread: CommentThreadEntry[] = [];
  const commentIdMap: { [key: string]: CommentThreadEntry } = {};

  comments.forEach((comment) => {
    commentIdMap[comment.id] = {
      ...comment,
      replies: [],
    } as CommentThreadEntry;
  });

  comments.forEach((comment) => {
    if (comment.parentType === null) {
      commentsThread.push(commentIdMap[comment.id]);
    } else {
      const parent = commentIdMap[comment.parentId];
      if (parent) {
        parent.replies.push(commentIdMap[comment.id]);
      }
    }
  });

  return commentsThread;
}

//Factory function that creates the result object of an action function
export function createFeedbackActionResult<T>(
  input: CreateFeedbackActionResultArgs<T>
): FeedbackActionResult<T> {
  const base: FeedbackActionResult<T> = {
    actionType: input.actionType,
    submissionOutcome: input.outcome,
    validationErrors: null,
    submitError: null,
    payload: null,
  };

  switch (input.outcome) {
    case "validationError":
      return {
        ...base,
        validationErrors: input.validationErrors,
      };
    case "failure":
      return {
        ...base,
        submitError: input.submitError,
      };
    case "success":
      return {
        ...base,
        payload: input.payload,
      };
  }
}

/* Utility function that narrows the unknown error from useRouteError() */
export function errorMessage(error: unknown): string {
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    console.error(error);
    return "Unknown error";
  }
}

/* Helper function to update search params based on user-selected criteria */
export function handleOptionChange(
  e: ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  setSearchParams: SetURLSearchParams,
  paramName: string,
  defaultOption: string
): void {
  const newOption = e.target.value;

  setSearchParams((prevParams) => {
    const newParams = new URLSearchParams(prevParams);

    if (newOption === defaultOption) {
      newParams.delete(paramName);
    } else {
      newParams.set(paramName, newOption);
    }

    return newParams;
  });
}

// Extracts and structures the result of a feedback form submission for easier consumption in UI components
export function getFeedbackFormResponse<T>(
  actionData: FeedbackActionResult<T>
): {
  actionType: ActionType;
  submissionOutcome: NotificationType;
  isSubmissionSuccessful: boolean;
  showForm: boolean;
  payload: T | null;
} {
  const { actionType, submissionOutcome, payload } = actionData || {};

  const isSubmissionSuccessful = submissionOutcome === "success";
  const showForm = !actionData || !isSubmissionSuccessful;

  return {
    actionType,
    submissionOutcome,
    isSubmissionSuccessful,
    showForm,
    payload,
  };
}
