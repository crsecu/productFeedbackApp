import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FeedbackItem from "./FeedbackItem";
import NoFeedbackEntries from "./NoFeedbackEntries";
import { sortFeedbackList } from "../../utils/helpers";
import FeedbackCard from "./FeedbackCard";
import UpvoteButton from "./UpvoteButton";
import { SuggestionFeedback } from "../../types/feedback.types";
import CommentCount from "../comments/CommentCount";

interface FeedbackListProps {
  suggestions: SuggestionFeedback[];
}

function FeedbackList({ suggestions }: FeedbackListProps): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category") || "all";
  const sortBy = searchParams.get("sortBy") || "mostUpvotes";

  const feedbackItems = useMemo(() => {
    const suggestionsSorted = sortFeedbackList(suggestions, category, sortBy);

    return suggestionsSorted.map((item) => {
      return (
        <li key={item.id}>
          <FeedbackItem>
            <UpvoteButton
              feedbackId={item.id}
              initialUpvoteCount={item.upvotes}
            />

            <Link to={`/feedbackDetail/${item.id}`}>
              <FeedbackCard feedback={item}>
                <CommentCount count={item.commentCount} />
              </FeedbackCard>
            </Link>
          </FeedbackItem>
        </li>
      );
    });
  }, [category, sortBy, suggestions]);

  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      {feedbackItems.length === 0 ? (
        <NoFeedbackEntries category={category} />
      ) : (
        <ul>{feedbackItems}</ul>
      )}
    </section>
  );
}

export default FeedbackList;
