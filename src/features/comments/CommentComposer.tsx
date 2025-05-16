import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/redux.hooks";
import { ReactNode, useEffect } from "react";
import { CommentPayload, ReplyPayload } from "../../types/comment.types";
import CommentBox from "./CommentBox";
import { getLoggedInUser } from "../../store/slices/userSlice";
import BannerNotification from "../../ui/notifications/BannerNotification";
import styled from "styled-components";
import { panelStyles } from "../../styles/features/FeedbackStyles";

const StyledCommentComposer = styled.div`
  ${panelStyles}

  & h2 {
    padding-bottom: 4px;
  }

  & div {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

type CommentComposerProps = {
  children?: ReactNode;
} & (
  | { mode: "comment"; payload: CommentPayload }
  | {
      mode: "reply";
      payload: ReplyPayload;
      onReplySubmitted: () => void;
    }
);

function CommentComposer(props: CommentComposerProps): React.JSX.Element {
  const fetcher = useFetcher();

  const { name, username, image } = useAppSelector(getLoggedInUser);

  const { children, mode, payload } = props;
  const { actionType, submissionOutcome } = fetcher?.data || {};

  const onReplySubmitted =
    mode === "reply" ? props.onReplySubmitted : undefined;

  useEffect(() => {
    if (fetcher?.state === "idle" && submissionOutcome === "success") {
      if (onReplySubmitted) {
        onReplySubmitted();
      }
    }
  }, [fetcher, onReplySubmitted, submissionOutcome]);

  const notification = (
    <BannerNotification
      actionType={actionType}
      notificationType={submissionOutcome}
    />
  );
  return (
    <StyledCommentComposer>
      {submissionOutcome !== "success" && notification}
      <fetcher.Form method="post" action=".">
        {children}
        <input
          type="hidden"
          name="submissionData"
          value={JSON.stringify({
            mode,
            author: { name, username, image },
            payload,
          })}
        />
        <CommentBox
          mode={mode}
          submissionStatus={fetcher?.state}
          submissionOutcome={submissionOutcome}
        />
      </fetcher.Form>
    </StyledCommentComposer>
  );
}

export default CommentComposer;
