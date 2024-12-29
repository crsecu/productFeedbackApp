import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackByCategory } from "./feedbackSlice";
import FeedbackItem from "./FeedbackItem";
import NoFeedbackEntries from "./NoFeedbackEntries";

function FeedbackList(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";

  const feedbackList = useAppSelector((state) =>
    getFeedbackByCategory(category)(state)
  );

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      {feedbackList.length === 0 ? (
        <NoFeedbackEntries category={category} />
      ) : (
        <ul>
          {feedbackList.map((item) => {
            return (
              <li key={item.id}>
                <FeedbackItem feedbackItem={item} />
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default FeedbackList;
