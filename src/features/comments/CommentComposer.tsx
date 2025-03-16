import { useFetcher } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { ReactNode } from "react";
import { CommentPayload, ReplyPayload } from "../../types/comment.types";

type CommentComposerProps = {
  children?: ReactNode;
} & (
  | { mode: "comment"; payload: CommentPayload }
  | {
      mode: "reply";
      payload: ReplyPayload;
    }
);

function CommentComposer(props: CommentComposerProps): React.JSX.Element {
  const fetcher = useFetcher();

  const loggedInUser = useAppSelector((state) => state.user.validatedUser);
  const { name, username, image } = loggedInUser;

  const { children, mode, payload } = props;

  return (
    <>
      {fetcher.state === "idle" && fetcher.data && <p>Comment added</p>}
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

        <textarea id="commentInput" name="content"></textarea>
        <button name="intent" value="addComment">
          {fetcher.state !== "idle" ? "Posting comment..." : "Post Comment"}
        </button>

        {/* <button disabled={commentContent.trim() === ""}>
          {fetcher.state !== "idle" ? "Posting comment..." : "Post Comment"}
        </button> */}
      </fetcher.Form>
    </>
  );
}

export default CommentComposer;
