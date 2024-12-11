import { Feedback } from "./feedback.types";
import { Link } from "react-router-dom";
import { memo } from "react";
import UpvoteButton from "./UpvoteButton";
import FeedbackCard from "./FeedbackCard";

interface FeedbackItemProps {
  feedbackItem: Feedback;
  isDetailPage?: boolean;
}
function FeedbackItem({
  feedbackItem,
  isDetailPage = false,
}: FeedbackItemProps): React.JSX.Element {
  return (
    <>
      <UpvoteButton feedbackId={feedbackItem.id} />
      {isDetailPage ? (
        <>
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
            <FeedbackCard feedback={feedbackItem} />
          </Link>
        </>
      ) : (
        <FeedbackCard feedback={feedbackItem} />
      )}
    </>
  );
}

export default memo(FeedbackItem);
