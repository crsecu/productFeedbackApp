import { useAppSelector } from "../../types/hooks";
import { Link } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";

function FeedbackList(): React.JSX.Element {
  const feedbackList = useAppSelector((state) => state.feedback.feedbackList);

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      {feedbackList.length === 0 ? (
        <div>
          <p>There is no feedback yet.</p>
          <p>Got a suggestion? Found a bug that needs to be squashed?</p>
          <p>We love hearing about new ideas to improve our app.</p>
        </div>
      ) : (
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
      )}
    </section>
  );
}

export default FeedbackList;
