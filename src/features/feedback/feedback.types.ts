export interface Feedback {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentCount: number;
}

export interface CommentAuthor {
  image: string;
  name: string;
  username: string;
}

export interface Comment {
  id?: string;
  feedbackId: string;
  type: "comment";
  parentId: null;
  parentType: null;
  content: string;
  user: CommentAuthor;
}

export interface CommentReply {
  id?: string;
  feedbackId: string;
  type: "reply";
  parentId: string;
  parentType: "comment" | "reply";
  content: string;
  replyingTo: string;
  user: CommentAuthor;
}

export type CommentListType = (Comment | CommentReply)[];
