import { SuggestionFeedback } from "../../types/feedback.types";
import { RoadmapFeedback } from "../../types/roadmap.types";
import styled from "styled-components";
import { CategoryLabel } from "../../styles/features/FeedbackStyles";
import { H3 } from "../../styles/Typography";
import {
  capitalizeFirstLetter,
  formatCategoryLabel,
} from "../../utils/helpers";

import { RoadmapStatusDot } from "../../styles/features/RoadmapStyles";

export const StyledFeedbackCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
  word-break: break-word;

  & h3,
  h3 + p {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  & h3 + p {
    -webkit-line-clamp: 2;
  }

  & h3 + p {
    color: var(--color-text-muted);
    min-height: 39px;
  }
`;

const FeedbackTitle = styled(H3)`
  letter-spacing: -0.18px;
`;

interface FeedbackCardContentProps {
  feedback: RoadmapFeedback | SuggestionFeedback;
  className?: string;
}

function FeedbackCardContent({
  feedback,
  className,
}: FeedbackCardContentProps): React.JSX.Element {
  if (!feedback) return <article>No matching value found</article>;

  const { title, description, category, status } = feedback;
  const categoryLabel = formatCategoryLabel(category);
  const statusLabel = capitalizeFirstLetter(status);
  return (
    <StyledFeedbackCardContent className={className}>
      {/* TO DO: change to h1 for FeedbackDetail */}

      {status !== "suggestion" && (
        <RoadmapStatusDot $status={status}>{statusLabel}</RoadmapStatusDot>
      )}

      <FeedbackTitle>{title}</FeedbackTitle>
      <p>{description}</p>

      <CategoryLabel>{categoryLabel}</CategoryLabel>
    </StyledFeedbackCardContent>
  );
}

export default FeedbackCardContent;
