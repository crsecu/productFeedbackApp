import { fetchComments } from "../../services/apiComment";
import { useEffect, useState } from "react";
import { CommentListType, CommentThreadEntry } from "../../types/comment.types";
import Comment from "./Comment";

import { buildCommentHierarchy } from "../../utils/helpers";

interface CommentListProps {
  commentCount: number;
  feedbackId: string;
}

function CommentList({
  commentCount,
  feedbackId,
}: CommentListProps): React.JSX.Element {
  const [comments, setComments] = useState<CommentThreadEntry[]>([]);

  useEffect(
    function () {
      async function retrieveComments() {
        const commentList: CommentListType = await fetchComments(feedbackId);
        const commentThread = buildCommentHierarchy(commentList);
        setComments(commentThread);
      }

      retrieveComments();
    },
    [feedbackId, commentCount]
  );

  return (
    <>
      <h2>
        <span>{commentCount}</span> Comments
      </h2>
      <ul className="comments">
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
