import { fetchComments } from "../../services/apiComment";
import { useEffect, useState } from "react";
import { CommentListType, CommentThreadEntry } from "../../types/comment.types";
import Comment from "./Comment";
import { useNavigationType } from "react-router-dom";
import { buildCommentHierarchy } from "../../utils/helpers";

interface CommentListProps {
  commentCount: number;
  feedbackId: string;
}

function CommentList({
  commentCount,
  feedbackId,
}: CommentListProps): React.JSX.Element {
  const navigationType = useNavigationType();
  const [comments, setComments] = useState<CommentThreadEntry[]>([]);

  useEffect(
    function () {
      async function retrieveComments() {
        if (navigationType === "REPLACE") return;

        const commentList: CommentListType = await fetchComments(feedbackId);
        const commentThread = buildCommentHierarchy(commentList);
        setComments(commentThread);
      }

      retrieveComments();
    },
    [feedbackId, commentCount, navigationType]
  );

  if (commentCount === 0)
    return <p>No comments yet. Be the first to share your thoughts!</p>;

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul>
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
