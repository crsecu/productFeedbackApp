import { useEffect, useState } from "react";
import { SubmissionOutcome } from "../../types/action.types";

interface CommentBoxProps {
  submissionStatus: "idle" | "loading" | "submitting";
  submissionOutcome: SubmissionOutcome;
}
function CommentBox({
  submissionStatus,
  submissionOutcome,
}: CommentBoxProps): React.JSX.Element {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (submissionStatus === "idle" && submissionOutcome === "success") {
      setContent("");
    }
  }, [submissionOutcome, submissionStatus]);
  return (
    <>
      <textarea
        id="commentInput"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></textarea>
      <button
        name="intent"
        value="addComment"
        disabled={content.trim() === "" || submissionStatus !== "idle"}
      >
        {submissionStatus !== "idle" ? "Posting comment..." : "Post Comment"}
      </button>
    </>
  );
}

export default CommentBox;
