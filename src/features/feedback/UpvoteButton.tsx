import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import { persistFeedbackVote } from "../../services/apiFeedback";
import {
  trackUserUpvote,
  untrackUserUpvote,
  getIsFeedbackUpvoted,
} from "../../store/slices/userSlice";
import { showNotification } from "../../store/slices/toastNotificationSlice";
import { useState } from "react";
import styled from "styled-components";
import { IoChevronUpSharp } from "react-icons/io5";

const StyledUpvoteButton = styled.button`
  position: absolute;
  bottom: 20px;
  left: 28px;

  padding: 6px 14px;
  border: none;
  border-radius: 10px;
  background-color: var(--color-surface-accent);
  color: var(--color-text-dark);
  font-weight: bold;

  & svg {
    margin-bottom: 2px;
    margin-right: 5px;
    color: var(--color-secondary);
  }

  & path {
    stroke-width: 18%;
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
        dispatch(showNotification({ type: "upvoteFeedback_error" }));
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <StyledUpvoteButton
      className={className}
      disabled={isLoading}
      onClick={handleUpvote}
      // className={isFeedbackUpvoted ? "upvoted" : ""}
    >
      <StyledChevronUp size="0.65rem" />{" "}
      <span>{isLoading ? "Upvoting..." : upvoteCount}</span>
    </StyledUpvoteButton>
  );
}

export default UpvoteButton;
