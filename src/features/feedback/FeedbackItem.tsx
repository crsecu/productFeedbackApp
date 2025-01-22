import { FeedbackType } from "../../types/feedback.types";
import { Link } from "react-router-dom";
import { memo } from "react";
import UpvoteButton from "./UpvoteButton";
import FeedbackCard from "./FeedbackCard";

interface FeedbackItemProps {
  feedbackItem: FeedbackType;
  isDetailPage?: boolean;
}
function FeedbackItem({
  feedbackItem,
  isDetailPage = false,
}: FeedbackItemProps): React.JSX.Element {
  return (
    <div>
      <UpvoteButton
        feedbackId={feedbackItem.id}
        initialUpvoteCount={feedbackItem.upvotes}
      />
      {isDetailPage ? (
        <FeedbackCard feedback={feedbackItem} />
      ) : (
        <>
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
            <FeedbackCard feedback={feedbackItem} />
          </Link>
        </>
      )}
    </div>
  );
}

export default memo(FeedbackItem);
