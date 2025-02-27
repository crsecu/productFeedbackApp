import { Link } from "react-router-dom";
import {
  InProgressType,
  LiveType,
  PlannedType,
} from "../../types/feedback.types";
import FeedbackItem from "../feedback/FeedbackItem";
import UpvoteButton from "../feedback/UpvoteButton";
import FeedbackCard from "../feedback/FeedbackCard";

interface RoadmapStatusColumn {
  feedbackList: PlannedType[] | InProgressType[] | LiveType[];
  description: string;
  title: string;
}
function RoadmapStatusColumn({
  feedbackList,
  title,
  description,
}: RoadmapStatusColumn): React.JSX.Element {
  return (
    <>
      <h2>
        {title} <span>({feedbackList.length})</span>
      </h2>
      <p>{description}</p>

      <ul>
        {feedbackList.map((feedbackItem) => {
          return (
            <li key={feedbackItem.id}>
              <span>{title}</span>
              <FeedbackItem>
                <UpvoteButton
                  feedbackId={feedbackItem.id}
                  initialUpvoteCount={feedbackItem.upvotes}
                />
                <Link to={`/feedbackDetail/${feedbackItem.id}`}>
                  <FeedbackCard feedback={feedbackItem} />
                </Link>
              </FeedbackItem>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RoadmapStatusColumn;
