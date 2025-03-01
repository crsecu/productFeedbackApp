import { Link } from "react-router-dom";
import {
  InProgressType,
  LiveType,
  PlannedType,
} from "../../types/feedback.types";
import FeedbackItem from "../feedback/FeedbackItem";
import UpvoteButton from "../feedback/UpvoteButton";
import FeedbackCard from "../feedback/FeedbackCard";

import { ReactNode } from "react";

interface RoadmapStatusColumn {
  children: ReactNode;
  feedbackList: PlannedType[] | InProgressType[] | LiveType[];
}
function RoadmapStatusColumn({
  children,
  feedbackList,
}: RoadmapStatusColumn): React.JSX.Element {
  //TO DO: memoize
  const statusColumns = feedbackList.map((feedbackItem) => {
    return (
      <li key={feedbackItem.id}>
        <FeedbackItem>
          <UpvoteButton
            feedbackId={feedbackItem.id}
            initialUpvoteCount={feedbackItem.upvotes}
          />
          <Link to={`/feedbackDetail/${feedbackItem.id}`}>
            <FeedbackCard feedback={feedbackItem}>
              <h3>{feedbackItem.title}</h3>
            </FeedbackCard>
          </Link>
        </FeedbackItem>
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
