import { User } from "../user/user.types";

export interface Feedback {
  id: number | null;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  commentCount: number;
  //comments: CommentType;
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: CommentReply;
}
export interface CommentReply {
  content: string;
  replyingTo: string;
  user: User;
}
