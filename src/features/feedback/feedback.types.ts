import { User } from "../user/user.types";

export interface Feedback {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentCount: number;
}

export interface Comment {
  id: string;
  parentId: null;
  feedbackId: string;
  content: string;
  user: User;
  replies: [] | CommentReply[];
}

export interface CommentReply {
  id: string;
  parentId: string;
  parentType: "comment" | "reply";
  content: string;
  replyingTo: string;
  user: User;
  replies: [] | CommentReply[];
}

export interface NewComment {
  feedbackId: string;
  content: string;
  user: User;
}
