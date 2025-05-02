import { SuggestionFeedback } from "../../types/feedback.types";
import { RoadmapFeedback } from "../../types/roadmap.types";
import styled from "styled-components";
import { CategoryLabel } from "../../styles/features/FeedbackStyles";
import { H3 } from "../../styles/Typography";
import {
  capitalizeFirstLetter,
  formatCategoryLabel,
} from "../../utils/helpers";
import device from "../../styles/breakpoints";
import { StatusIndicator } from "../../styles/features/RoadmapStyles";

export const StyledFeedbackCardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & p {
    color: var(--color-text-muted);
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
  feedback: RoadmapFeedback | SuggestionFeedback;
}

function FeedbackCardContent({
  feedback,
}: FeedbackCardContentProps): React.JSX.Element {
  if (!feedback) return <article>No matching value found</article>;

  const { title, description, category, status } = feedback;
  const categoryLabel = formatCategoryLabel(category);
  const statusLabel = capitalizeFirstLetter(status);

  return (
    <StyledFeedbackCardContent>
      {/* TO DO: change to h1 for FeedbackDetail */}
      {status !== "suggestion" && (
        <p>
          <StatusIndicator $status={status} /> {statusLabel}
        </p>
      )}
      <FeedbackTitle>{title}</FeedbackTitle>
      <p>{description}</p>
      <CategoryLabel>{categoryLabel}</CategoryLabel>
    </StyledFeedbackCardContent>
  );
}

export default FeedbackCardContent;
