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

export interface CommentAuthor {
  image: string;
  name: string;
  username: string;
}

export interface Comment {
  id: string;
  parentId: null;
  feedbackId: string;
  content: string;
  user: CommentAuthor;
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
  parentId: null;
  feedbackId: string;
  content: string;
  user: CommentAuthor;
  replies: [];
}

export interface RootCommentDataType {
  id: string;
  parentId: null | string;
  authorUsername: string;
  replies: [] | CommentReply[];
}
