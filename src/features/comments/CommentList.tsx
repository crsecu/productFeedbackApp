import { memo, useMemo } from "react";
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
  console.log("rendering CommentList");

  const commentItems = useMemo(() => {
    console.log("recomputing commentItems");
    if (commentCount === 0) return;

    return comments.map((comment) => (
      <li key={comment.id}>
        <Comment comment={comment} commentCount={commentCount} />
      </li>
    ));
  }, [comments, commentCount]);

  if (commentCount === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul className="comments">{commentItems}</ul>
    </>
  );
}

export default memo(CommentList);
