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

export type FeedbackType =
  | SuggestionType
  | PlannedType
  | InProgressType
  | LiveType;

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

export interface FeedbackFormData {
  errors: FeedbackFormErrors;
}

// Loader data types
export interface FeedbackBoardLoaderData {
  roadmap: Record<RoadmapStatusType, number>;
  suggestions: SuggestionType[];
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
