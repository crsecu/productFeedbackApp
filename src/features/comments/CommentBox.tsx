import { useEffect, useState } from "react";

interface CommentBoxProps {
  submissionStatus: "idle" | "loading" | "submitting";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  submissionResult: any;
}
function CommentBox({
  submissionStatus,
  submissionResult,
}: CommentBoxProps): React.JSX.Element {
  const [content, setContent] = useState("");

  useEffect(() => {
    if (submissionStatus === "idle" && submissionResult?.success) {
      setContent("");
    }
  }, [submissionResult?.success, submissionStatus]);
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
