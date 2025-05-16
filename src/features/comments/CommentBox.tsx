import { useEffect, useState } from "react";
import { SubmissionOutcome } from "../../types/action.types";
import { PrimaryButton, Textarea } from "../../styles/UIStyles";
import { styled } from "styled-components";
import { capitalizeFirstLetter } from "../../utils/helpers";
import device from "../../styles/breakpoints";
const StyledCommentBox = styled.div<{ $mode: "comment" | "reply" }>`
  display: flex;
  flex-direction: column;
  gap: 4px;

  & div {
    display: flex;
    align-items: center;
  }

  & button {
    margin-left: auto;
  }

  @media ${device.sm} {
    flex-direction: ${(props) => props.$mode === "reply" && "row"};
    column-gap: 16px;

    & textarea {
      flex: 1;
    }
  }
`;
const CharacterCount = styled.p<{ $charCount: number; $maxCharCount: number }>`
  display: inline-block;

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
  const modeCapitalized = capitalizeFirstLetter(mode);
  useEffect(() => {
    if (submissionStatus === "idle" && submissionOutcome === "success") {
      setContent("");
    }
  }, [submissionOutcome, submissionStatus]);
  return (
    <StyledCommentBox $mode={mode}>
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
          {submissionStatus !== "idle"
            ? `Posting ${modeCapitalized}...`
            : `Post ${modeCapitalized}`}
        </PrimaryButton>
      </div>
    </StyledCommentBox>
  );
}

export default CommentBox;
