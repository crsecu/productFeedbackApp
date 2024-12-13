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
  feedbackId?: number;
  content: string;
  user: User;
  replies?: CommentReply[];
}

export interface CommentReply {
  id: string;
  content: string;
  replyingTo: string;
  user: User;
}

export interface NewComment {
  feedbackId: string;
  content: string;
  user: User;
}
