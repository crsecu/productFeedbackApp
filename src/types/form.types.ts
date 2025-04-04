import { CategoryType } from "./feedback.types";
import { StatusType } from "./roadmap.types";

//Add/Edit Feedback Form Types
export type FeedbackFormKeys = "title" | "category" | "description" | "status";

export interface CreateFeedbackFormValues {
  title: string;
  category: CategoryType;
  description: string;
}
export interface EditFeedbackFormValues extends CreateFeedbackFormValues {
  status: StatusType;
}

export interface FeedbackFormErrors {
  [key: string]: string;
}
