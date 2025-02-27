import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FeedbackItem from "./FeedbackItem";
import NoFeedbackEntries from "./NoFeedbackEntries";
import { sortFeedbackList } from "../../utils/helpers";
import FeedbackCard from "./FeedbackCard";
import UpvoteButton from "./UpvoteButton";
import { SuggestionType } from "../../types/feedback.types";

interface FeedbackListProps {
  suggestions: SuggestionType[];
}

function FeedbackList({ suggestions }: FeedbackListProps): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "mostUpvotes";

  const suggestionsSorted = useMemo(
    () => sortFeedbackList(suggestions, category, sortBy),
    [suggestions, category, sortBy]
  );

  const feedbackItems = useMemo(() => {
    return suggestionsSorted.map((item) => {
      return (
        <li key={item.id}>
          <FeedbackItem>
            <UpvoteButton
              feedbackId={item.id}
              initialUpvoteCount={item.upvotes}
            />

            <Link to={`/feedbackDetail/${item.id}`}>
              <FeedbackCard feedback={item} />
            </Link>
          </FeedbackItem>
        </li>
      );
    });
  }, [suggestionsSorted]);

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      {suggestionsSorted.length === 0 ? (
        <NoFeedbackEntries category={category} />
      ) : (
        <ul>{feedbackItems}</ul>
      )}
    </section>
  );
}

export default FeedbackList;
