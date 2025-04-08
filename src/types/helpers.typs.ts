//Types for helper functions

import { Feedback } from "./feedback.types";
import { RoadmapFeedbackType } from "./roadmap.types";

export type PageContext = "feedbackBoard" | "developmentRoadmap";

export type FeedbackFetched<T extends PageContext> = T extends "feedbackBoard"
  ? Feedback[]
  : RoadmapFeedbackType[];
