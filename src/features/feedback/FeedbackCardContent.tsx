import { SuggestionFeedback } from "../../types/feedback.types";
import { RoadmapFeedback } from "../../types/roadmap.types";
import styled from "styled-components";
import { CategoryLabel } from "../../styles/features/FeedbackStyles";
import { H3 } from "../../styles/Typography";
import { formatCategoryLabel } from "../../utils/helpers";
import device from "../../styles/breakpoints";

import { ReactNode } from "react";

export const StyledFeedbackCardContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;

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

  & p {
    color: var(--color-text-muted);
    min-height: 39px;
  }

  & p:first-child {
    margin-bottom: 8px;
  }

  & p:first-child span {
    margin-right: 4px;
  }

  & label {
    width: fit-content;
  }

  /* @media ${device.sm} {
    gap: 3px;

    flex-shrink: 2.5;
    & label {
      margin-top: 6px;
    }
  } */
`;

const FeedbackTitle = styled(H3)`
  letter-spacing: -0.18px;
`;

interface FeedbackCardContentProps {
  children?: ReactNode;
  feedback: RoadmapFeedback | SuggestionFeedback;
  className?: string;
}

function FeedbackCardContent({
  children,
  feedback,
  className,
}: FeedbackCardContentProps): React.JSX.Element {
  if (!feedback) return <article>No matching value found</article>;

  const { title, description, category } = feedback;
  const categoryLabel = formatCategoryLabel(category);

  return (
    <StyledFeedbackCardContent className={className}>
      {/* TO DO: change to h1 for FeedbackDetail */}
      {children}

      <FeedbackTitle>{title}</FeedbackTitle>
      <p>{description}</p>

      <CategoryLabel>{categoryLabel}</CategoryLabel>
    </StyledFeedbackCardContent>
  );
}

export default FeedbackCardContent;
