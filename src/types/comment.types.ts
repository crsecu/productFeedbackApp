export interface CommentAuthor {
  image: string;
  name: string;
  username: string;
}

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

export type CommentListType = (CommentType | ReplyType)[];

export type CommentKindType = "comment" | "reply";
