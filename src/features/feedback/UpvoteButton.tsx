import { useState } from "react";
import { useAppDispatch } from "../../types/hooks";
import { addFeedbackUpvote } from "./feedbackSlice";
import { removeFeedbackUpvote } from "./feedbackSlice";
import { upvoteFeedback } from "../../services/apiFeedback";

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

  async function handleUpvote() {
    // eslint-disable-next-line no-debugger
    //debugger;

    if (!userHasUpvoted) {
      console.log("Dispatching a UPVOTING action.");
      dispatch(addFeedbackUpvote(feedbackId));
      await upvoteFeedback(feedbackId, upvotes + 1);
    } else {
      console.log("Dispatching a UNVOTING action.");
      dispatch(removeFeedbackUpvote(feedbackId));
      await upvoteFeedback(feedbackId, upvotes - 1);
    }

    setUserHasUpvoted((prevState) => !prevState);

    /*  TO DO:
   - save upvotedFeedbackId in backend (think about when to make the api request) 
   - continue working on toggle logic */
  }

  return (
    <button onClick={handleUpvote} className={userHasUpvoted ? "upvoted" : ""}>
      ^ <span>{upvotes}</span>
    </button>
  );
}

export default UpvoteButton;
