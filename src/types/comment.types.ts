/* "NewComment/NewReply" represents the data model for a comment/reply before it is sent to the server
JSON Server automatically assigns a unique id to each comment/reply upon creation
"Comment/Reply" types represent the saved comment/reply returned by the server 
*/

//These are the fields shared by both comment/reply
export interface BaseCommentFields {
  feedbackId: string;
  id: string;
  content: string;
  user: CommentAuthor;
}

export interface Comment extends BaseCommentFields {
  type: "comment";
  parentId: null;
  parentType: null;
}
export type NewComment = Omit<Comment, "id">;

export interface Reply extends BaseCommentFields {
  type: "reply";
  parentId: string;
  parentType: CommentKindType;
  replyingTo: string;
}
export type NewReply = Omit<Reply, "id">;

export type CommentKindType = "comment" | "reply";
export type CommentListType = (Comment | Reply)[];

/* Type annotation for comment/reply that belongs to a comment thread (data is transformed from flat structure to nested structure after fetching)*/
export interface CommentThreadEntry extends BaseCommentFields {
  type: CommentKindType;
  parentId: string | null;
  parentType: CommentKindType | null;
  replyingTo?: string;
  replies: CommentThreadEntry[];
}

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

export interface NewCommentOrReply {
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

export interface CommentData {
  success: boolean;
  err?: string;
  commentHierarchy: CommentThreadEntry[];
  commentCount: number;
}
