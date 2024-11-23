import { Comment } from "../feedback/feedback.types";
interface CommentListProps {
  comments: Comment[];
}

function CommentList({ comments }: CommentListProps): React.JSX.Element {
  return <ul></ul>;
}

export default CommentList;
