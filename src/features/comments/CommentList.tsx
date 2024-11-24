import { Comment as CommentType } from "../feedback/feedback.types";
import Comment from "./Comment";
import { calculateTotalComments } from "../../utils/helpers";
interface CommentListProps {
  comments: CommentType[] | undefined;
}

function CommentList({ comments }: CommentListProps): React.JSX.Element {
  if (!comments)
    return <p>No comments yet. Be the first to share your thoughts!</p>;
  const commentCount = calculateTotalComments(comments);

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <Comment comment={comment} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CommentList;
