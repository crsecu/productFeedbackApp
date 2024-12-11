import { Feedback } from "./feedback.types";
import { Link } from "react-router-dom";
import { memo } from "react";
import UpvoteButton from "./UpvoteButton";
import FeedbackCard from "./FeedbackCard";

interface FeedbackItemProps {
  feedbackItem: Feedback;
}
function FeedbackItem({ feedbackItem }: FeedbackItemProps): React.JSX.Element {
  return (
    <li>
      <UpvoteButton
        upvotes={feedbackItem.upvotes}
        feedbackId={feedbackItem.id}
      />
      <Link to={`/feedbackDetail/${feedbackItem.id}`}>
        <FeedbackCard feedback={feedbackItem} />
      </Link>
    </li>
  );
}

export default memo(FeedbackItem);
