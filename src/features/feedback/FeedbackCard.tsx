import { memo, ReactNode } from "react";
import styled from "styled-components";

const StyledFeedbackCard = styled.div`
  position: relative;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);
  padding: 28px 28px 20px 28px;
  padding: 28px;

  & p {
    text-wrap: wrap;
  }
`;

interface FeedbackCardProps {
  children: ReactNode;
}
function FeedbackCard({ children }: FeedbackCardProps): React.JSX.Element {
  return <StyledFeedbackCard>{children}</StyledFeedbackCard>;
}

export default memo(FeedbackCard);
