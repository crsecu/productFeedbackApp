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

interface RoadmapStatusColumn {
  children: ReactNode;
  feedbackList: PlannedFeedback[] | InProgressFeedback[] | LiveFeedback[];
}
function RoadmapStatusColumn({
  children,
  feedbackList,
}: RoadmapStatusColumn): React.JSX.Element {
  //TO DO: memoize
  const statusColumns = feedbackList.map((feedbackItem) => {
    return (
      <li key={feedbackItem.id}>
        <FeedbackCard>
          <UpvoteButton
            feedbackId={feedbackItem.id}
            initialUpvoteCount={feedbackItem.upvotes}
          />
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
            <FeedbackCardContent feedback={feedbackItem}>
              <h3>{feedbackItem.title}</h3>
            </FeedbackCardContent>
          </Link>
        </FeedbackCard>
      </li>
    );
  });

  return (
    <li>
      {children}
      <ul>{statusColumns}</ul>
    </li>
  );
}

export default RoadmapStatusColumn;
