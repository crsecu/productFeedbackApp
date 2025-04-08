/* "NewFeedbackType" represents the data model for a feedback entry before it is sent to the server
   JSON Server automatically assigns a unique id to each feedback entry upon creation
   "FeedbackType" extends NewFeedbackType to include the id field, representing the saved feedback entry returned by the server 
*/

import { RoadmapFeedbackType } from "./roadmap.types";

// Status and category TYPES
export const CATEGORY_OPTIONS = [
  "feature",
  "ui",
  "ux",
  "enhancement",
  "bug",
] as const;

//export type Category = "feature" | "ui" | "ux" | "enhancement" | "bug";
export type Category = (typeof CATEGORY_OPTIONS)[number];

export const STATUS_OPTIONS = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
] as const;
export type Status = (typeof STATUS_OPTIONS)[number];

export interface CommonFeedbackFields {
  title: string;
  category: Category;
  upvotes: number;
  description: string;
  commentCount: number;
}

// Shared feedback fields
export interface BaseFeedbackFields {
  title: string;
  category: Category;
  upvotes: number;
  description: string;
  commentCount: number;
}

// Generic helper to create types based on status (suggestion, planned, in-Progress, live)
type FeedbackWithStatus<S extends Status> = BaseFeedbackFields & {
  id: string;
  status: S;
};

export type SuggestionFeedback = FeedbackWithStatus<"suggestion">;
export type PlannedFeedback = FeedbackWithStatus<"planned">;
export type InProgressFeedback = FeedbackWithStatus<"in-Progress">;
export type LiveFeedback = FeedbackWithStatus<"live">;

export type NewFeedback = Omit<SuggestionFeedback, "id">;

export type Feedback =
  | SuggestionFeedback
  | PlannedFeedback
  | InProgressFeedback
  | LiveFeedback;

export type FeedbackGroupedByStatus = {
  suggestion: SuggestionFeedback[];
  planned: PlannedFeedback[];
  "in-Progress": InProgressFeedback[];
  live: LiveFeedback[];
};

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

//type of all possible feedback
export type FeedbackType = RoadmapFeedbackType | SuggestionType;
