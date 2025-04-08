//All types related to loader functions

import {
  FeedbackType,
  InProgressFeedback,
  LiveFeedback,
  PlannedFeedback,
  SuggestionFeedback,
} from "./feedback.types";
import { RoadmapStats } from "./roadmap.types";

export interface FeedbackBoardLoaderData {
  suggestions: SuggestionFeedback[];
  roadmapFeedbackCount: number;
  roadmapStatusCounts: RoadmapStats;
}

export interface RoadmapLoaderData {
  planned: PlannedFeedback[];
  "in-Progress": InProgressFeedback[];
  live: LiveFeedback[];
}

export type LoaderDataType =
  | FeedbackBoardLoaderData
  | RoadmapLoaderData
  | FeedbackType;
