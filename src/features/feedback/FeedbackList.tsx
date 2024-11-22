import { useAppSelector } from "../../types/hooks";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";

function FeedbackList(): React.JSX.Element {
  const feedbackList = useAppSelector((state) => state.feedback.feedbackList);

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      <ul>
        {feedbackList.map((item) => {
          return (
            <li key={item.id}>
              <Link to={`/feedbackDetail/${item.id}`}>
                <FeedbackCard feedback={item} />
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FeedbackList;
