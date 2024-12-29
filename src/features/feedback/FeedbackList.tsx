import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackByCategory } from "./feedbackSlice";
import FeedbackItem from "./FeedbackItem";
import NoFeedbackEntries from "./NoFeedbackEntries";
import { sortFeedbackList } from "../../utils/helpers";

function FeedbackList(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "mostUpvotes";

  const feedbackList = useAppSelector((state) =>
    getFeedbackByCategory(category)(state)
  );

  const feedbackListSorted = sortFeedbackList(feedbackList, sortBy);

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      {feedbackListSorted.length === 0 ? (
        <NoFeedbackEntries category={category} />
      ) : (
        <ul>
          {feedbackListSorted.map((item) => {
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
