import { useAppDispatch, useAppSelector } from "../../types/hooks";
import { addFeedbackUpvote } from "./feedbackSlice";
import { removeFeedbackUpvote } from "./feedbackSlice";
import { persistFeedbackVote } from "../../services/apiFeedback";
import {
  trackUserUpvote,
  untrackUserUpvote,
  getIsFeedbackUpvoted,
} from "../user/userSlice";

import { getFeedbackUpvoteCount } from "./feedbackSlice";

interface UpvoteButtonProps {
  feedbackId: string;
}
function UpvoteButton({ feedbackId }: UpvoteButtonProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const upvotes = useAppSelector(getFeedbackUpvoteCount(feedbackId));

  const isFeedbackUpvoted = useAppSelector(getIsFeedbackUpvoted(feedbackId));

  async function handleUpvote() {
    const action = isFeedbackUpvoted ? removeFeedbackUpvote : addFeedbackUpvote;
    const userAction = isFeedbackUpvoted ? untrackUserUpvote : trackUserUpvote;
    const updatedUpvotes = isFeedbackUpvoted ? upvotes - 1 : upvotes + 1;

    dispatch(action(feedbackId));
    dispatch(userAction(feedbackId));
    await persistFeedbackVote(feedbackId, updatedUpvotes);
    /* TO DO:
     - implement logic to save the upvotedFeedbackIds to the backend
     */
  }

  return (
    <button
      onClick={handleUpvote}
      className={isFeedbackUpvoted ? "upvoted" : ""}
    >
      ^ <span>{upvotes}</span>
    </button>
  );
}

export default UpvoteButton;
