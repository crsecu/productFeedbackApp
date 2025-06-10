import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import { persistFeedbackVote } from "../../services/apiFeedback";
import {
  trackUserUpvote,
  untrackUserUpvote,
  getIsFeedbackUpvoted,
} from "../../store/slices/userSlice";
import { showToastNotification } from "../../store/slices/toastNotificationSlice";
import { useState } from "react";
import styled from "styled-components";
import { IoChevronUpSharp } from "react-icons/io5";

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

  & svg {
    margin-bottom: 2px;
    margin-right: 5px;
    color: ${(props) =>
      props.$isUpvoted ? `var(--color-text-light)` : `var(--color-text-dark)`};
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
`;

const StyledChevronUp = styled(IoChevronUpSharp)`
  display: inline-block;
  vertical-align: middle;
`;

interface UpvoteButtonProps {
  feedbackId: string;
  initialUpvoteCount: number;
  className?: string;
}

function UpvoteButton({
  feedbackId,
  initialUpvoteCount,
  className,
}: UpvoteButtonProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);

  const isFeedbackUpvoted = useAppSelector(getIsFeedbackUpvoted(feedbackId));

  const userUpvoteTrackingAction =
    initialUpvoteCount === 0 || isFeedbackUpvoted === false
      ? trackUserUpvote
      : untrackUserUpvote;

  const nextUpvoteCount =
    upvoteCount === 0 || !isFeedbackUpvoted ? upvoteCount + 1 : upvoteCount - 1;

  function handleUpvote() {
    setIsLoading(true);

    persistFeedbackVote(feedbackId, nextUpvoteCount)
      .then(() => {
        dispatch(userUpvoteTrackingAction(feedbackId));
        setUpvoteCount(nextUpvoteCount);
      })
      .catch(() => {
        dispatch(showToastNotification({ key: "upvoteFeedback_error" }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <StyledUpvoteButton
      $isUpvoted={isFeedbackUpvoted}
      className={className}
      disabled={isLoading}
      onClick={handleUpvote}
    >
      <StyledChevronUp size="0.65rem" />{" "}
      <span>{isLoading ? "Upvoting..." : upvoteCount}</span>
    </StyledUpvoteButton>
  );
}

export default UpvoteButton;
