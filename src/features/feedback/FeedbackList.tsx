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
            <Link to={`/feedbackDetail/${item.id}`} key={item.id}>
              <FeedbackCard key={item.id} feedback={item} />
            </Link>
          );
        })}
      </ul>
    </section>
  );
}

export default FeedbackList;
