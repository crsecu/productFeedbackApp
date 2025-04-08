import {
  Feedback,
  FeedbackGroupedByStatus,
  Status,
  SuggestionFeedback,
} from "./feedback.types";

//type of feedback belonging to Roadmap
export type RoadmapFeedback = Exclude<Feedback, SuggestionFeedback>;

export type RoadmapStatus = Exclude<Status, "suggestion">; //represents status types for Roadmap

export interface RoadmapStats {
  planned: number;
  "in-Progress": number;
  live: number;
}

export type RoadmapFeedbackGroupedByStatus = Omit<
  FeedbackGroupedByStatus,
  "suggestion"
>;
