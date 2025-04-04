/* "NewCommentType/NewReplyType" represents the data model for a comment/reply before it is sent to the server
JSON Server automatically assigns a unique id to each comment/reply upon creation
"CommentType/ReplyType" extends NewCommentType/NewReplyType to include the id field, representing the saved comment/reply returned by the server 
*/

export interface NewCommentType {
  feedbackId: string;
  type: "comment";
  parentId: null;
  parentType: null;
  content: string;
  user: CommentAuthor;
}

export interface CommentType extends NewCommentType {
  id: string;
}

export interface NewReplyType {
  feedbackId: string;
  type: "reply";
  parentId: string;
  parentType: CommentKindType;
  content: string;
  replyingTo: string;
  user: CommentAuthor;
}

export interface ReplyType extends NewReplyType {
  id: string;
}

/* Type annotation for comment/reply that belongs to a comment thread (data is transformed from flat structure to nested structure after fetching)*/
export interface CommentThreadEntry {
  id: string;
  feedbackId: string;
  type: CommentKindType;
  parentId: string | null;
  parentType: CommentKindType | null;
  content: string;
  replyingTo?: string;
  user: CommentAuthor;
  replies: CommentThreadEntry[];
}

export type CommentListType = (CommentType | ReplyType)[];

export type CommentKindType = "comment" | "reply";

export interface BasePayload {
  feedbackId: string;
  commentCount: number;
}

export type CommentPayload = BasePayload;
export type ReplyPayload = BasePayload & {
  parent: {
    id: string | null;
    type: CommentKindType | null;
    author: string;
  };
};

export interface SubmissionDataType {
  author: CommentAuthor;
  mode: CommentKindType;
  payload: CommentPayload | ReplyPayload;
}

export interface BaseCommentType {
  feedbackId: string;
  type: CommentKindType;
  parentId: string | null;
  parentType: CommentKindType | null;
  content: string;
  user: CommentAuthor;
  replyingTo?: string;
}

export interface CommentAuthor {
  image: string;
  name: string;
  username: string;
}
