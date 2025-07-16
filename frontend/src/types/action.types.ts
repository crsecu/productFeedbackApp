//All types related to action functions, including submission results and outcomes

import { FeedbackFormErrors } from "./form.types";

export type ActionType =
  | "createFeedback"
  | "editFeedback"
  | "addComment"
  | "createUser"
  | "authenticateUser";

export type SubmissionOutcome = "success" | "failure" | "validationError";

export type ValidationErrorResult = {
  actionType: ActionType;
  validationErrors: FeedbackFormErrors;
};
export type FailureResult = {
  actionType: ActionType;
  submitError: unknown;
};
export type SuccessResult<T> = {
  actionType: ActionType;
  payload: T;
};

/*Return value of createActionResult  */
export type ActionResult<TPayload = null> =
  | {
      submissionOutcome: "validationError";
      actionType: ActionType;
      validationErrors: FeedbackFormErrors;
      submitError: null;
      payload: null;
    }
  | {
      submissionOutcome: "failure";
      actionType: ActionType;
      validationErrors: null;
      submitError: unknown;
      payload: null;
    }
  | {
      submissionOutcome: "success";
      actionType: ActionType;
      validationErrors: null;
      submitError: null;
      payload: TPayload;
    };
