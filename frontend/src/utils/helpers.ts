import { isRouteErrorResponse, SetURLSearchParams } from "react-router-dom";
import { submitComment } from "../services/apiComment";
import {
  NewCommentOrReply,
  CommentListType,
  CommentThreadEntry,
  ReplyPayload,
  SubmissionDataType,
} from "../types/comment.types";
import {
  Feedback,
  FeedbackGroupedByStatus,
  SuggestionFeedback,
} from "../types/feedback.types";
import { useRef, useState } from "react";
import {
  ActionResult,
  ValidationErrorResult,
  FailureResult,
  SuccessResult,
  ActionType,
  SubmissionOutcome,
} from "../types/action.types";
import { FeedbackFormErrors, FieldValueTracker } from "../types/form.types";
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
    const errorMsg = errorMessage(error);
    console.log("api call error fetchWrapper", errorMsg);
    throw errorMsg;
  }
}

//Capitalize first letter
export function capitalizeFirstLetter(word: string): string {
  if (word === "")
    console.error("capitalizeFirstLetter: cannot capitalize empty string");

  return word.charAt(0).toUpperCase() + word.slice(1);
}

//Format category label
export function formatCategoryLabel(categoryLabel: string): string {
  if (categoryLabel === null) return categoryLabel;

  return categoryLabel.length === 2
    ? categoryLabel.toUpperCase()
    : capitalizeFirstLetter(categoryLabel);
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
  const feedbackList =
    category === "all" ? list : filterFeedbackByCategory(list, category);

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
  // accessToken: string,
  content: string,
  submissionData: SubmissionDataType,
  actionType: "addComment"
): Promise<ActionResult | ActionResult<NewCommentOrReply>> {
  const {
    author,
    mode,
    payload: { commentCount, feedbackId },
  } = submissionData;

  /* Common fields between comment and reply */
  const comment: NewCommentOrReply = {
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

  //Submit new comment and return a standardized result: success(if submission succeeds), or failure (if it fails)
  const result = await performActionSubmission<NewCommentOrReply>(
    actionType,
    () => submitComment(comment, commentCount)
  );

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
  outcome: SubmissionOutcome,
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
  if (isRouteErrorResponse(error)) {
    return `${error.status} ${error.statusText}`;
  } else if (error instanceof Error) {
    console.log("checking error msg ", error);
    return error.message.includes("Failed to fetch")
      ? "Network error. Please check your internet connection."
      : error.message;
  } else if (typeof error === "string") {
    return error;
  } else {
    console.error(error);
    return "Unknown error";
  }
}

/* Helper function to update search params based on user-selected criteria */
export function handleOptionChange(
  setSearchParams: SetURLSearchParams,
  paramName: string,
  defaultOption: string,
  currentQueryParamValue: string
): void {
  setSearchParams((prevParams) => {
    const params = new URLSearchParams(prevParams);

    if (currentQueryParamValue === defaultOption) {
      params.delete(paramName);
    } else {
      params.set(paramName, currentQueryParamValue);
    }

    return params;
  });
}

// Extracts and structures the result of a feedback form submission for easier consumption in UI components
export function getFeedbackFormResponse<T>(actionData: ActionResult<T>): {
  actionType: ActionType;
  submissionOutcome: SubmissionOutcome;
  isSubmissionSuccessful: boolean;
  showForm: boolean;
  payload: T | null;
  validationErrors: FeedbackFormErrors | null;
  submitError: unknown | null;
} {
  const {
    actionType,
    submissionOutcome,
    payload,
    validationErrors,
    submitError,
  } = actionData || {};

  const isSubmissionSuccessful = submissionOutcome === "success";
  const showForm = !isSubmissionSuccessful;

  return {
    actionType,
    submissionOutcome,
    isSubmissionSuccessful,
    showForm,
    payload,
    validationErrors,
    submitError,
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
export async function performActionSubmission<TPayload>(
  actionType: ActionType,
  submitForm: () => Promise<MutationResult<TPayload>>
): Promise<ActionResult | ActionResult<TPayload>> {
  const submissionResult = await submitForm();

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

////////////////////////////////////////////////////////
//Form Dirty State

function createFieldTrackers<Type>(
  initialFormValues: Type
): Record<keyof Type, FieldValueTracker> {
  const tracker = {} as Record<keyof Type, FieldValueTracker>;

  for (const field in initialFormValues) {
    tracker[field] = {
      name: field,
      initialValue: initialFormValues[field] as string,
      currentValue: null,
      isDirty: false,
    };
  }

  return tracker;
}

//Track Form Dirty State Custom Hook
export function useFormChangeTracker<Type extends Record<string, string>>(
  initialValues: Type
) {
  const formValues = useRef(createFieldTrackers(initialValues));
  const [isFormDirty, setIsDirty1] = useState(false);

  function handleFieldChange<K extends Extract<keyof Type, string>>(
    fieldName: K,
    fieldValue: Type[K]
  ): void {
    const fieldTracker = formValues.current[fieldName];

    fieldTracker.currentValue = fieldValue;
    fieldTracker.isDirty =
      fieldTracker.currentValue !== fieldTracker.initialValue;

    if (fieldTracker.isDirty) {
      if (isFormDirty) return;
      setIsDirty1(true);
    } else {
      let dirtyFieldCount = 0;

      //field not changed, isDirty === true
      for (const field in formValues.current) {
        const currentFieldValue = formValues.current[field];

        if (currentFieldValue.isDirty) {
          dirtyFieldCount += 1;
        }
      }

      if (dirtyFieldCount === 0) setIsDirty1(false);
    }
  }

  return [isFormDirty, handleFieldChange] as const;
}
