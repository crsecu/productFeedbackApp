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

export interface EditedFeedbackType {
  title: string;
  description: string;
  category: CategoryType;
  status: StatusType;
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
export interface CreateFeedbackFormValues {
  title: string;
  category: string;
  description: string;
}
export interface EditFeedbackFormValues extends CreateFeedbackFormValues {
  status: StatusType;
}

export interface FeedbackFormErrors {
  [key: string]: string;
}

export interface FeedbackActionResult {
  success?: boolean | null; //true/false (form submission sucessful/failed), null (form wasn't submitted due to validation errors)
  actionType: "createFeedback" | "editFeedback" | "addComment"; //identifies the type of action submitted
  validationErrors?: FeedbackFormErrors | null;
  message?: string | null; //human friendly message for both success/failure
  payload?: Record<string, string | number> | null; //for now using payload to pass the id of new feedback; extend later if needed
}

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
