import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { ReactNode, useEffect } from "react";
import { CommentPayload, ReplyPayload } from "../../types/comment.types";
import CommentBox from "./CommentBox";

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

  const loggedInUser = useAppSelector((state) => state.user.validatedUser);
  const { name, username, image } = loggedInUser;

  const { children, mode, payload } = props;
  const submissionResult = fetcher?.data;

  const onReplySubmitted =
    mode === "reply" ? props.onReplySubmitted : undefined;
  useEffect(() => {
    if (fetcher?.state === "idle" && fetcher?.data?.success) {
      if (onReplySubmitted) {
        console.log("SANTA");
        onReplySubmitted();
      }
    }
  }, [fetcher?.data?.success, fetcher?.state, mode, onReplySubmitted]);

  return (
    <>
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
