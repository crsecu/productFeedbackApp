import { InProgressType, LiveType, PlannedType } from "./feedback.types";

//type of feedback belonging to Roadmap
export type RoadmapFeedbackType = PlannedType | InProgressType | LiveType;

export type RoadmapStatusType = "planned" | "in-Progress" | "live"; //represents status types for Roadmap

export type StatusType = RoadmapStatusType | "suggestion";

export interface RoadmapStats {
  planned: number;
  "in-Progress": number;
  live: number;
}
