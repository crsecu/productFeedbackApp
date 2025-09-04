import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import { persistFeedbackVote } from "../../services/apiFeedback";
import { trackUserUpvote } from "../../store/slices/userSlice";
import { showToastNotification } from "../../store/slices/toastNotificationSlice";
import { useState } from "react";
import styled from "styled-components";
import { IoChevronUpSharp } from "react-icons/io5";
import { focusStyle } from "../../styles/UIStyles";
import { ensureValidSession } from "../../services/apiAuth";
import SpinnerMini from "../../ui/SpinnerMini";
import device from "../../styles/breakpoints";

const StyledUpvoteButton = styled.button<{ $isUpvoted: boolean }>`
  position: absolute;
  bottom: 20px;
  min-width: 65px;
  height: 34px;
  font-size: var(--text-xs);
  border: none;
  border-radius: 10px;
  background-color: ${(props) =>
    props.$isUpvoted
      ? `var(--color-secondary)`
      : `var(--color-surface-accent)`};
  color: ${(props) =>
    props.$isUpvoted ? `var(--color-text-light)` : `var(--color-text-dark)`};
  font-weight: bold;

  & > svg {
    margin-bottom: 2px;
    margin-right: 8px;
    color: ${(props) =>
      props.$isUpvoted ? `var(--color-text-light)` : `var(--color-secondary)`};
  }

  & path {
    stroke-width: 18%;
  }

  &:hover {
    background-color: ${(props) =>
      props.$isUpvoted
        ? "var(--color-secondary-hover)"
        : "var(--color-surface-accent-hover)"};
  }

  ${focusStyle}

  @media ${device.sm} {
    & svg {
      margin-right: 5px;
    }
  }
`;

const StyledChevronUp = styled(IoChevronUpSharp)`
  display: inline-block;
  vertical-align: middle;
`;

interface UpvoteButtonProps {
  feedbackId: string;
  initialUpvoteCount: number;
  isUpvotedByCurrentUser: boolean;
  className?: string;
}

function UpvoteButton({
  feedbackId,
  initialUpvoteCount,
  isUpvotedByCurrentUser,
  className,
}: UpvoteButtonProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(isUpvotedByCurrentUser);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);

  const userAuthId = useAppSelector((state) => state.user.authId);

  async function handleUpvote() {
    setIsLoading(true);

    try {
      const authSession = await ensureValidSession();
      if (!authSession) {
        //here return to "/"
        throw new Error("No access token available");
      }

      const { accessToken } = authSession;
      const response = await persistFeedbackVote(
        feedbackId,
        accessToken,
        userAuthId
      );

      if (response === "upvoted") {
        setUpvoteCount((prevState) => prevState + 1);
        setIsUpvoted(true);
        dispatch(trackUserUpvote(feedbackId));
      } else {
        setIsUpvoted(false);
        setUpvoteCount((prevState) => prevState - 1);
      }
    } catch (err) {
      console.error("Failed to upvote:", err);
      dispatch(showToastNotification({ key: "upvoteFeedback_error" }));
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledUpvoteButton
      $isUpvoted={isUpvoted}
      className={className}
      disabled={isLoading}
      onClick={handleUpvote}
    >
      <StyledChevronUp size="0.65rem" />
      <span>{isLoading ? <SpinnerMini /> : upvoteCount}</span>
    </StyledUpvoteButton>
  );
}

export default UpvoteButton;
