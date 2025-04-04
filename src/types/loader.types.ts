//All types related to loader functions

import {
  SuggestionType,
  PlannedType,
  InProgressType,
  LiveType,
  FeedbackType,
} from "./feedback.types";
import { RoadmapStats } from "./roadmap.types";

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
