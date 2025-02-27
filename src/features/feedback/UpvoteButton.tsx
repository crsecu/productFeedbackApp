import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { persistFeedbackVote } from "../../services/apiFeedback";
import {
  trackUserUpvote,
  untrackUserUpvote,
  getIsFeedbackUpvoted,
} from "../../store/slices/userSlice";
import { showNotification } from "../../store/slices/toastNotificationSlice";

import { useState } from "react";

interface UpvoteButtonProps {
  feedbackId: string;
  initialUpvoteCount: number;
}

function UpvoteButton({
  feedbackId,
  initialUpvoteCount,
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
    <button
      disabled={isLoading}
      onClick={handleUpvote}
      className={isFeedbackUpvoted ? "upvoted" : ""}
    >
      ^ <span>{isLoading ? "Upvoting..." : upvoteCount}</span>
    </button>
  );
}

export default UpvoteButton;
