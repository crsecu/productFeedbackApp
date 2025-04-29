import { useMemo, useState } from "react";
import { CommentThreadEntry } from "../../types/comment.types";
import CommentComposer from "./CommentComposer";
import styled from "styled-components";
import { ReplyButton } from "../../styles/UIStyles";

const StyledAddReply = styled.div`
  & button {
    position: absolute;
    right: 0;
    top: 35px;
  }
`;

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
    <StyledAddReply>
      <ReplyButton
        className="reply"
        onClick={() => setShowCommentBox((prevState) => !prevState)}
      >
        Reply
      </ReplyButton>

      {showCommentBox && (
        <CommentComposer
          mode="reply"
          payload={replyPayload}
          onReplySubmitted={() => setShowCommentBox(false)}
        ></CommentComposer>
      )}
    </StyledAddReply>
  );
}

export default AddReply;
