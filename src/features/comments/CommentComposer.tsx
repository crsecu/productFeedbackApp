import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/redux.hooks";
import { ReactNode, useEffect } from "react";
import { CommentPayload, ReplyPayload } from "../../types/comment.types";
import CommentBox from "./CommentBox";
import { getLoggedInUser } from "../../store/slices/userSlice";
import BannerNotification from "../../ui/BannerNotification";

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
  const submissionResult = fetcher?.data;

  const onReplySubmitted =
    mode === "reply" ? props.onReplySubmitted : undefined;

  useEffect(() => {
    console.log("I should run", fetcher);
    if (fetcher?.state === "idle" && submissionResult?.submissionOutcome) {
      console.log("I should run ????");
      if (onReplySubmitted) {
        onReplySubmitted();
      }
    }
  }, [fetcher, onReplySubmitted, submissionResult?.submissionOutcome]);

  const notification = (
    <BannerNotification
      actionType={submissionResult?.actionType}
      notificationType={submissionResult?.submissionOutcome}
    />
  );
  return (
    <>
      {notification}
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
          submissionStatus={fetcher?.state}
          submissionResult={submissionResult}
        />
      </fetcher.Form>
    </>
  );
}

export default CommentComposer;
