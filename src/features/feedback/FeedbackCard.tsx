import { ReactNode } from "react";
import { SuggestionFeedback } from "../../types/feedback.types";
import { RoadmapFeedback } from "../../types/roadmap.types";
import styled from "styled-components";
const StyledFeedbackCard = styled.div`
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;
interface FeedbackCardProps {
  children: ReactNode;
  feedback: RoadmapFeedback | SuggestionFeedback;
}

function FeedbackCard({
  children,
  feedback,
}: FeedbackCardProps): React.JSX.Element {
  if (!feedback) return <article>No matching value found</article>;

  const { description, category, status } = feedback;

  return (
    <StyledFeedbackCard>
      {/* TO DO: change to h1 for FeedbackDetail */}
      <h3>{feedback.title}</h3>
      {status !== "suggestion" && <p>* {status}</p>}
      <p>{description}</p>
      <p>{category}</p>
      {children}
      <br></br>
    </StyledFeedbackCard>
  );
}

export default FeedbackCard;
