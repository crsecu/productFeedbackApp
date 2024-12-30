import { FeedbackType } from "../../types/feedback.types";
import FeedbackItem from "../feedback/FeedbackItem";
interface RoadmapStatusColumn {
  feedbackList: FeedbackType[];
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
              <FeedbackItem feedbackItem={feedbackItem} />
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default RoadmapStatusColumn;
