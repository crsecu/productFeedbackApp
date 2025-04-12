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
  Feedback,
  FeedbackGroupedByStatus,
  Status,
  SuggestionFeedback,
} from "../types/feedback.types";
import { ChangeEvent } from "react";
import { NotificationType } from "../ui/BannerNotification";
import {
  ActionResult,
  ValidationErrorResult,
  FailureResult,
  SuccessResult,
  ActionType,
} from "../types/action.types";
import { FeedbackFormErrors } from "../types/form.types";
import { MutationResult } from "../types/mutation.types";

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
 The validateUserCredentials func fetches a user from the mock API and validates the provided credentials
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
  feedbackList: SuggestionFeedback[],
  category: string
): SuggestionFeedback[] {
  return feedbackList.filter(
    (feedbackEntry) => feedbackEntry.category === category
  );
}

//Sort feedback list
export function sortFeedbackList(
  list: SuggestionFeedback[],
  category: string,
  sortByOption: string
): SuggestionFeedback[] {
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
): Promise<ActionResult | ActionResult<BaseCommentType>> {
  const {
    author,
    mode,
    payload: { commentCount, feedbackId },
  } = submissionData;

  /* Common fields between comment and reply */
  const comment: BaseCommentType = {
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
    comment.replyingTo = author;
    comment.parentId = id;
    comment.parentType = type;
  }

  //Closure function that captures commentCount and passes it to submitComment func
  const submitNewComment = (data: BaseCommentType) =>
    submitComment(data, commentCount);

  //Submit new comment and return a standardized result: success(if submission succeeds), or failure (if it fails)
  const result = await performActionSubmission<
    BaseCommentType,
    BaseCommentType
  >(actionType, comment, submitNewComment);

  return result;
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
/////////////////////////////////////////////////////////////////////////
//Factory function that creates the result object of an action function
export function createActionResult(
  outcome: "validationError",
  data: ValidationErrorResult
): ActionResult<null>;

export function createActionResult(
  outcome: "failure",
  data: FailureResult
): ActionResult<null>;

export function createActionResult<TPayload>(
  outcome: "success",
  data: SuccessResult<TPayload>
): ActionResult<TPayload>;

export function createActionResult<TPayload>(
  outcome: "success" | "failure" | "validationError",
  data: SuccessResult<TPayload> | FailureResult | ValidationErrorResult
): ActionResult<TPayload> {
  const base = {
    actionType: data.actionType,
  };
  switch (outcome) {
    case "validationError":
      return {
        ...base,
        submissionOutcome: "validationError",
        validationErrors: (data as { validationErrors: FeedbackFormErrors })
          .validationErrors,
        submitError: null,
        payload: null,
      };
    case "failure":
      return {
        ...base,
        submissionOutcome: "failure",
        validationErrors: null,
        submitError: (data as { submitError: unknown }).submitError,
        payload: null,
      };
    case "success":
      return {
        ...base,
        submissionOutcome: "success",
        validationErrors: null,
        submitError: null,
        payload: (data as { payload: TPayload }).payload,
      };
  }
}

/* Utility function that narrows the unknown error from useRouteError() */
export function errorMessage(error: unknown): string {
  console.log("ATTENTION ERROR", error);
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
export function getFeedbackFormResponse<T>(actionData: ActionResult<T>): {
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

/* This function validates form values used in action functions and
returns an error object with messages for empty string fields*/
export function getValidationErrors<T>(formValues: T): FeedbackFormErrors {
  const validationErrors: FeedbackFormErrors = {};

  for (const field in formValues) {
    const value = formValues[field];

    if (typeof value === "string" && value.trim() === "") {
      validationErrors[field] = `Please enter a valid ${field}`;
    }
  }

  return validationErrors;
}

/* Helper functions that handles validation errors - returns a standardized action result: validationErrors*/
export function handleValidationErrors<FormValuesType>(
  actionType: ActionType,
  formValues: FormValuesType
): ActionResult | null {
  const validationErrors = getValidationErrors<FormValuesType>(formValues);

  if (Object.keys(validationErrors).length > 0) {
    return createActionResult("validationError", {
      actionType,
      validationErrors,
    });
  }

  return null;
}

/* This function handles form validation and submission - it returns a standardized action result: success, failure, validationError */
//Submits some form data and return a standardized result
export async function performActionSubmission<TSubmissionData, TPayload>(
  actionType: ActionType,
  submissionData: TSubmissionData,
  // eslint-disable-next-line no-unused-vars
  submitForm: (_data: TSubmissionData) => Promise<MutationResult<TPayload>>
): Promise<ActionResult | ActionResult<TPayload>> {
  const submissionResult = await submitForm(submissionData);

  // action submission failed
  if (!submissionResult.success) {
    return createActionResult("failure", {
      actionType,
      submitError: submissionResult.error,
    });
  }

  // action submission successful
  return createActionResult<TPayload>("success", {
    actionType,
    payload: submissionResult.payload,
  });
}

//////////////////////////////////////
//Func groups feedback by status
export function groupFeedbackByStatus(
  feedbackList: Feedback[]
): FeedbackGroupedByStatus {
  const feedbackGroupedByStatus: FeedbackGroupedByStatus = {
    suggestion: [],
    planned: [],
    "in-Progress": [],
    live: [],
  };

  const result = feedbackList.reduce(
    (acc: FeedbackGroupedByStatus, cur: Feedback) => {
      const status = cur.status;

      switch (status) {
        case "suggestion":
          acc.suggestion.push(cur);
          break;
        case "planned":
          acc.planned.push(cur);
          break;
        case "in-Progress":
          acc["in-Progress"].push(cur);
          break;
        case "live":
          acc.live.push(cur);
          break;
      }

      return acc;
    },
    feedbackGroupedByStatus
  );

  return result;
}
