import { useEffect, useState } from "react";
import { SubmissionOutcome } from "../../types/action.types";
import { PrimaryButton, Textarea } from "../../styles/UIStyles";
import { styled } from "styled-components";

const CharacterCount = styled.p<{ $charCount: number; $maxCharCount: number }>`
  color: ${(props) =>
    props.$charCount === props.$maxCharCount && "var(--color-danger)"};
`;
interface CommentBoxProps {
  submissionStatus: "idle" | "loading" | "submitting";
  submissionOutcome: SubmissionOutcome;
  mode: "comment" | "reply";
}
function CommentBox({
  submissionStatus,
  submissionOutcome,
  mode,
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
        maxLength={250}
        placeholder="Type your comment here"
      ></Textarea>

      <div>
        {mode === "comment" && (
          <CharacterCount $charCount={content.length} $maxCharCount={250}>
            {250 - content.length} Characters left
          </CharacterCount>
        )}
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
