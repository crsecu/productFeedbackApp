import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FeedbackCard from "./FeedbackCard";
import EmptyFeedbackState from "./EmptyFeedbackState";
import { sortFeedbackList } from "../../utils/helpers";
import FeedbackCardContent from "./FeedbackCardContent";
import { SuggestionFeedback } from "../../types/feedback.types";
import CommentCount from "../comments/CommentCount";
import styled from "styled-components";
import device from "../../styles/breakpoints";
import { UpvoteButtonDynamic } from "../../styles/features/FeedbackStyles";

const StyledFeedbackList = styled.section`
  display: flex;
  flex-direction: column;
  flex-grow: 1;

  & ul {
    display: flex;
    flex-direction: column;
    padding: 28px 20px;
    gap: 18px;
  }

  @media ${device.sm} {
    & ul {
      gap: 14px;
      padding: 0 0 28px;
    }
  }
`;

const SuggestionCard = styled(FeedbackCard)`
  @media ${device.sm} {
    gap: 26px;

    & a {
      gap: 6px;
    }
  }

  @media ${device.md} {
    gap: 36px;
    padding: 28px;
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
          <SuggestionCard>
            <UpvoteButtonDynamic
              feedbackId={item.id}
              initialUpvoteCount={item.upvotes}
            />

            <Link to={`/feedbackDetail/${item.id}`}>
              <FeedbackCardContent feedback={item} />
              <CommentCount count={item.commentCount} />
            </Link>
          </SuggestionCard>
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
