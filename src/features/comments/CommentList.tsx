import { CommentThreadEntry } from "../../types/comment.types";
import Comment from "./Comment";

interface CommentListProps {
  commentCount: number;
  comments: CommentThreadEntry[];
}

function CommentList({
  commentCount,
  comments,
}: CommentListProps): React.JSX.Element {
  if (commentCount === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul className="comments">
        {/* TO DO: memoize */}
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              <Comment comment={comment} commentCount={commentCount} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default CommentList;
