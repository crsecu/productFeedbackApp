import { Link } from "react-router-dom";
import {
  InProgressFeedback,
  LiveFeedback,
  PlannedFeedback,
} from "../../types/feedback.types";
import FeedbackCard from "../feedback/FeedbackCard";
import UpvoteButton from "../feedback/UpvoteButton";
import FeedbackCardContent from "../feedback/FeedbackCardContent";

import { ReactNode } from "react";

interface FeedbackStatusListProps {
  children: ReactNode;
  feedbackList: PlannedFeedback[] | InProgressFeedback[] | LiveFeedback[];
}

/* This component renders a feedback card list based on status: planned, in-Progress, live */
function FeedbackStatusList({
  children,
  feedbackList,
}: FeedbackStatusListProps): React.JSX.Element {
  //TO DO: memoize
  const feedbackCards = feedbackList.map((feedbackItem) => {
    return (
      <li key={feedbackItem.id}>
        <FeedbackCard>
          <UpvoteButton
            feedbackId={feedbackItem.id}
            initialUpvoteCount={feedbackItem.upvotes}
          />
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
            <FeedbackCardContent feedback={feedbackItem} />
          </Link>
        </FeedbackCard>
      </li>
    );
  });

  return (
    <>
      {children}
      <ul>{feedbackCards}</ul>
    </>
  );
}

export default FeedbackStatusList;
