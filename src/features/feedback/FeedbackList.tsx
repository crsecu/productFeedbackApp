import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import FeedbackItem from "./FeedbackItem";
import NoFeedbackEntries from "./NoFeedbackEntries";
import { sortFeedbackList } from "../../utils/helpers";

function FeedbackList(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "mostUpvotes";

  const suggestionsList = useAppSelector(
    (state) => state.feedback.feedbackList
  );

  const suggestionsListSorted = sortFeedbackList(
    suggestionsList,
    category,
    sortBy
  );

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      {suggestionsListSorted.length === 0 ? (
        <NoFeedbackEntries category={category} />
      ) : (
        <ul>
          {suggestionsListSorted.map((item) => {
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
