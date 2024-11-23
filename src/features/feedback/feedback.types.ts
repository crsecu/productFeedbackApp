import { User } from "../user/user.types";

export interface Feedback {
  id: string;
  title: string;
  category: string;
  upvotes: number;
  status: string;
  description: string;
  comments?: Comment[];
}

export interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: CommentReply[];
}
export interface CommentReply {
  content: string;
  replyingTo: string;
  user: User;
}
