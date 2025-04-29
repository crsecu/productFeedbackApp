import { memo, useMemo } from "react";
import { CommentThreadEntry } from "../../types/comment.types";
import Comment from "./Comment";
import { H2 } from "../../styles/Typography";
import styled from "styled-components";

const CommentUL = styled.ul``;

interface CommentListProps {
  commentCount: number;
  comments: CommentThreadEntry[];
}

function CommentList({
  commentCount,
  comments,
}: CommentListProps): React.JSX.Element {
  const commentItems = useMemo(() => {
    if (commentCount === 0) return;

    return comments.map((comment) => (
      <Comment comment={comment} commentCount={commentCount} key={comment.id} />
    ));
  }, [comments, commentCount]);

  if (commentCount === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <H2>
        <span>{commentCount}</span> Comments
      </H2>
      <CommentUL>{commentItems}</CommentUL>
    </>
  );
}

export default memo(CommentList);
