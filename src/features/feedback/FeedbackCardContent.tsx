import { ReactNode } from "react";
import { SuggestionFeedback } from "../../types/feedback.types";
import { RoadmapFeedback } from "../../types/roadmap.types";
import styled from "styled-components";
import { CategoryLabel } from "../../styles/features/FeedbackStyles";
import { H3 } from "../../styles/Typography";
import { formatCategoryLabel } from "../../utils/helpers";
import device from "../../styles/breakpoints";

const StyledFeedbackCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & p {
    color: var(--color-text-muted);
  }

  & label {
    width: fit-content;
  }

  @media ${device.sm} {
    gap: 3px;

    flex-shrink: 2.5;
    & label {
      margin-top: 6px;
    }
  }
`;

const FeedbackTitle = styled(H3)`
  letter-spacing: -0.18px;
`;

interface FeedbackCardContentProps {
  children: ReactNode;
  feedback: RoadmapFeedback | SuggestionFeedback;
}

function FeedbackCardContent({
  children,
  feedback,
}: FeedbackCardContentProps): React.JSX.Element {
  if (!feedback) return <article>No matching value found</article>;

  const { title, description, category, status } = feedback;
  const categoryLabel = formatCategoryLabel(category);

  return (
    <StyledFeedbackCardContent>
      {/* TO DO: change to h1 for FeedbackDetail */}
      <FeedbackTitle>{title}</FeedbackTitle>
      {status !== "suggestion" && <p>* {status}</p>}
      <p>{description}</p>
      <CategoryLabel>{categoryLabel}</CategoryLabel>
      {children}
    </StyledFeedbackCardContent>
  );
}

export default FeedbackCardContent;
