import { useState } from "react";
import { upvoteFeedback } from "../../services/apiFeedback";
import { useAppDispatch } from "../../types/hooks";
import { toggleFeedbackUpvote } from "./feedbackSlice";

interface UpvoteButtonProps {
  upvotes: number;
  feedbackId: string;
}
function UpvoteButton({
  upvotes,
  feedbackId,
}: UpvoteButtonProps): React.JSX.Element {
  const dispatch = useAppDispatch();
  const [userHasUpvoted, setUserHasUpvoted] = useState(false);
  //const [upVoteCount, setUpvoteCount] = useState(upvotes);

  async function handleUpvote() {
    setUserHasUpvoted((prevState) => !prevState);
    dispatch(toggleFeedbackUpvote(feedbackId));

    await upvoteFeedback(feedbackId, upvotes + 1);

    //TO DO: continue working on toggle logic
  }

  return (
    <button onClick={handleUpvote} className={userHasUpvoted ? "upvoted" : ""}>
      ^ <span>{upvotes}</span>
    </button>
  );
}

export default UpvoteButton;
