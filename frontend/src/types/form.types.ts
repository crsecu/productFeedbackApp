import { Category, Status } from "./feedback.types";

// Add/Edit Feedback Form Types
export type FeedbackFormKeys = "title" | "category" | "description" | "status";

export interface CreateFeedbackFormValues {
  [key: string]: string;
  title: string;
  category: Category;
  description: string;
}

export interface EditFeedbackFormValues extends CreateFeedbackFormValues {
  status: Status;
}

export interface FeedbackFormErrors {
  [key: string]: string;
}

//Form Dirty State Tracking
export interface FieldValueTracker {
  name: string;
  initialValue: string;
  currentValue: null | string;
  isDirty: boolean;
}
