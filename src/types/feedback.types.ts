/* "NewFeedbackType" represents the data model for a feedback entry before it is sent to the server
   JSON Server automatically assigns a unique id to each feedback entry upon creation
   "FeedbackType" extends NewFeedbackType to include the id field, representing the saved feedback entry returned by the server 
*/

export type RoadmapStatusType = "planned" | "in-Progress" | "live"; //represents status types for Roadmap

export type StatusType = RoadmapStatusType | "suggestion"; //represents all possible status types

export interface NewFeedbackType {
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentCount: number;
}

export interface FeedbackType extends NewFeedbackType {
  id: string;
  status: StatusType;
}

export interface EditFeedbackFormValues {
  title: string;
  category: string;
  status: StatusType;
  description: string;
}

export interface FeedbackFormErrors {
  [key: string]: string;
}

export interface FeedbackFormData {
  errors: FeedbackFormErrors;
}
