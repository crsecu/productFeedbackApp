import { Comment as CommentType } from "../feedback/feedback.types";
import Comment from "./Comment";

interface CommentListProps {
  comments: CommentType[] | undefined;
  commentCount: number;
}

function CommentList({
  comments,
  commentCount,
}: CommentListProps): React.JSX.Element {
  if (!comments)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

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
