/* "NewFeedbackType" represents the data model for a feedback entry before it is sent to the server
   JSON Server automatically assigns a unique id to each feedback entry upon creation
   "FeedbackType" extends NewFeedbackType to include the id field, representing the saved feedback entry returned by the server 
*/

export type RoadmapStatusType = "planned" | "in-Progress" | "live"; //represents status types for Roadmap

export type StatusType = RoadmapStatusType | "suggestion";

export type CategoryType = "feature" | "ui" | "ux" | "enhancement" | "bug";

export interface CommonFeedbackFields {
  title: string;
  category: CategoryType;
  upvotes: number;
  description: string;
  commentCount: number;
}

export interface NewFeedbackType extends CommonFeedbackFields {
  status: "suggestion";
}

//Feedback Types by status
export interface SuggestionType extends NewFeedbackType {
  id: string;
}
export interface PlannedType extends CommonFeedbackFields {
  id: string;
  status: "planned";
}
export interface InProgressType extends CommonFeedbackFields {
  id: string;
  status: "in-Progress";
}
export interface LiveType extends CommonFeedbackFields {
  id: string;
  status: "live";
}

//type of feedback belonging to Roadmap
export type RoadmapFeedbackType = PlannedType | InProgressType | LiveType;

//type of all possible feedback
export type FeedbackType = RoadmapFeedbackType | SuggestionType;

//Add/Edit Feedback Form Types
export type FeedbackFormKeys = "title" | "category" | "description" | "status";

export interface CreateFeedbackFormValues {
  title: string;
  category: CategoryType;
  description: string;
}
export interface EditFeedbackFormValues extends CreateFeedbackFormValues {
  status: StatusType;
}

export interface FeedbackFormErrors {
  [key: string]: string;
}

export type ActionType = "createFeedback" | "editFeedback" | "addComment";

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

/* Input type for createActionResult */
// export type createActionResultArgs<T> =
//   | (ValidationErrorResult & { outcome: "validationError" })
//   | (FailureResult & { outcome: "failure" })
//   | (SuccessResult<T> & { outcome: "success" });

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

export interface RoadmapStats {
  planned: number;
  "in-Progress": number;
  live: number;
}

// Loader data types
export interface FeedbackBoardLoaderData {
  suggestions: SuggestionType[];
  roadmapTotal: number;
  roadmapStatusCounts: RoadmapStats;
}

export interface RoadmapLoaderData {
  planned: PlannedType[];
  "in-Progress": InProgressType[];
  live: LiveType[];
}

export type LoaderDataType =
  | FeedbackBoardLoaderData
  | RoadmapLoaderData
  | FeedbackType;

// Represents a successful result from a mutation (data submission/update operation)
export type MutationSuccess<T> = {
  success: true;
  payload: T;
};

// Represents a failed result from a mutation (data submission/update operation)
export type MutationFailure = {
  success: false;
  error: unknown;
};

//Union type for handling mutation outcomes (success or failure)
export type MutationResult<T> = MutationSuccess<T> | MutationFailure;
