//All types related to loader functions

import {
  Feedback,
  InProgressFeedback,
  LiveFeedback,
  PlannedFeedback,
  SuggestionFeedback,
} from "./feedback.types";
import { RoadmapStats } from "./roadmap.types";
import { UserProfile } from "./user.types";

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
  | Feedback;

//root loader return type
export interface AuthGuardLoaderData {
  accessToken: string;
  userProfile?: UserProfile; //optional key for now, might get rid of userProfile key
}
