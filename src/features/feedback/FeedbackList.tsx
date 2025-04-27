import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import EmptyFeedbackState from "./EmptyFeedbackState";
import { sortFeedbackList } from "../../utils/helpers";
import FeedbackCardContent from "./FeedbackCardContent";
import UpvoteButton from "./UpvoteButton";
import { SuggestionFeedback } from "../../types/feedback.types";
import CommentCount from "../comments/CommentCount";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledFeedbackList = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 28px 24px;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @media ${device.md} {
    padding: 0;
  }
`;
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
          <FeedbackCard>
            <UpvoteButton
              feedbackId={item.id}
              initialUpvoteCount={item.upvotes}
            />

            <Link to={`/feedbackDetail/${item.id}`}>
              <FeedbackCardContent feedback={item}>
                <CommentCount count={item.commentCount} />
              </FeedbackCardContent>
            </Link>
          </FeedbackCard>
        </li>
      );
    });
  }, [category, sortBy, suggestions]);

  return (
    <StyledFeedbackList>
      <h2 className="sr-only">Feedback List</h2> {/* visually hidden heading */}
      {feedbackItems.length === 0 ? (
        <EmptyFeedbackState category={category} />
      ) : (
        <ul>{feedbackItems}</ul>
      )}
    </StyledFeedbackList>
  );
}

export default FeedbackList;
