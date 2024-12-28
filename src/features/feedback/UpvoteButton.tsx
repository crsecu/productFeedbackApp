import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { persistFeedbackVote } from "../../services/apiFeedback";
import {
  trackUserUpvote,
  untrackUserUpvote,
  getIsFeedbackUpvoted,
} from "../user/userSlice";

interface UpvoteButtonProps {
  feedbackId: string;
  initialUpvoteCount: number;
}

function UpvoteButton({
  feedbackId,
  initialUpvoteCount,
}: UpvoteButtonProps): React.JSX.Element {
  const [upvoteCount, setUpvoteCount] = useState(initialUpvoteCount);
  const dispatch = useAppDispatch();

  const isFeedbackUpvoted = useAppSelector(getIsFeedbackUpvoted(feedbackId));

  async function handleUpvote() {
    const userUpvoteTrackingAction = isFeedbackUpvoted
      ? untrackUserUpvote
      : trackUserUpvote;
    const nextUpvoteCount = isFeedbackUpvoted
      ? upvoteCount - 1
      : upvoteCount + 1;

    setUpvoteCount((prevState) => {
      return isFeedbackUpvoted ? prevState - 1 : prevState + 1;
    });

    if (upvoteCount === 0) {
      dispatch(trackUserUpvote(feedbackId));
      await persistFeedbackVote(feedbackId, upvoteCount + 1);
    } else {
      dispatch(userUpvoteTrackingAction(feedbackId));
      await persistFeedbackVote(feedbackId, nextUpvoteCount);
    }

    /* TO DO:
     - implement logic to save the upvotedFeedbackIds to the backend
     */
  }

  return (
    <button
      onClick={handleUpvote}
      className={isFeedbackUpvoted ? "upvoted" : ""}
    >
      ^ <span>{upvoteCount}</span>
    </button>
  );
}

export default UpvoteButton;
