import { useMemo, useState } from "react";
import { CommentThreadEntry } from "../../types/comment.types";
import CommentComposer from "./CommentComposer";

interface AddReplyProps {
  parentComment: CommentThreadEntry;
  commentCount: number;
}
function AddReply({
  parentComment,
  commentCount,
}: AddReplyProps): React.JSX.Element {
  const [showCommentBox, setShowCommentBox] = useState(false);

  const { feedbackId, id, type, user: parentCommentAuthor } = parentComment;

  const replyPayload = useMemo(
    () => ({
      feedbackId,
      commentCount,
      parent: {
        id,
        type,
        author: parentCommentAuthor.username,
      },
    }),
    [commentCount, feedbackId, id, parentCommentAuthor.username, type]
  );

  return (
    <>
      <button onClick={() => setShowCommentBox((prevState) => !prevState)}>
        Reply Now
      </button>

      {showCommentBox && (
        <CommentComposer
          mode="reply"
          payload={replyPayload}
          onReplySubmitted={() => setShowCommentBox(false)}
        ></CommentComposer>
      )}
    </>
  );
}

export default AddReply;
