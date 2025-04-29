import { useEffect, useState } from "react";
import { SubmissionOutcome } from "../../types/action.types";
import styled from "styled-components";
import { PrimaryButton } from "../../styles/UIStyles";

const Textarea = styled.textarea`
  border: none;
  background-color: var(--color-background);
  width: 100%;
  height: 80px;
  margin: 20px 0 10px;
  border-radius: 5px;
`;
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
      <Textarea
        id="commentInput"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      ></Textarea>

      <div>
        <span>250 Characters left</span>
        <PrimaryButton
          name="intent"
          value="addComment"
          disabled={content.trim() === "" || submissionStatus !== "idle"}
        >
          {submissionStatus !== "idle" ? "Posting comment..." : "Post Comment"}
        </PrimaryButton>
      </div>
    </>
  );
}

export default CommentBox;
