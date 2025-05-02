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
  flex-grow: 1;

  padding: 28px 24px 46px;

  & ul {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  @media ${device.sm} {
    padding: 0;

    & ul {
      gap: 14px;
    }
  }
`;

const SuggestionCard = styled(FeedbackCard)`
  @media ${device.sm} {
    display: flex;
    gap: 26px;
    padding: 28px 22px;

    & a {
      display: flex;
      justify-content: space-between;
      gap: 6px;
      flex-grow: 1;
    }
  }

  @media ${device.md} {
    gap: 36px;
    padding: 28px;
  }
`;

const UpvoteButtonSuggestion = styled(UpvoteButton)`
  @media ${device.sm} {
    position: initial;
    height: fit-content;
    padding: 10px 8px 8px;

    & svg {
      display: block;
      margin: auto;
      margin-bottom: 5px;
      height: 14px;
      width: 14px;
    }
  }

  @media ${device.md} {
    padding: 12px 10px 8px;

    & svg {
      margin-bottom: 5px;
      height: 14px;
      width: 14px;
    }
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
            <UpvoteButtonSuggestion
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
