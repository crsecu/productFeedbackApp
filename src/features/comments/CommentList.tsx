import { Comment as CommentType } from "../feedback/feedback.types";
import Comment from "./Comment";
import { calculateTotalComments } from "../../utils/helpers";
interface CommentListProps {
  comments: CommentType[];
}

function CommentList({ comments }: CommentListProps): React.JSX.Element {
  if (!comments)
    return <p>No comments yet. Be the first to share your thoughts!</p>;
  console.log(comments);

  return (
    <ul>
      {comments.map((comment) => (
        <li key={comment.id}>
          <Comment comment={comment} />
        </li>
      ))}
    </ul>
  );
}

export default CommentList;
