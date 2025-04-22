// Status and category TYPES
export const CATEGORY_OPTIONS = [
  "ui",
  "ux",
  "enhancement",
  "bug",
  "feature",
] as const;

export type Category = (typeof CATEGORY_OPTIONS)[number];

export const STATUS_OPTIONS = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
] as const;

export type Status = (typeof STATUS_OPTIONS)[number];

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

//Feedback Types by status
export type SuggestionFeedback = FeedbackWithStatus<"suggestion">;
export type PlannedFeedback = FeedbackWithStatus<"planned">;
export type InProgressFeedback = FeedbackWithStatus<"in-Progress">;
export type LiveFeedback = FeedbackWithStatus<"live">;

/* "NewFeedback" represents the data model for a feedback entry before it is sent to the server
   JSON Server automatically assigns a unique id to each feedback entry upon creation */
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
