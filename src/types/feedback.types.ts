/* "NewFeedbackType" represents the data model for a feedback entry before it is sent to the server
   JSON Server automatically assigns a unique id to each feedback entry upon creation
   "FeedbackType" extends NewFeedbackType to include the id field, representing the saved feedback entry returned by the server 
*/
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
}
