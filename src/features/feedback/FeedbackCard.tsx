import { memo, ReactNode } from "react";
import styled from "styled-components";
import { panelStyles } from "../../styles/features/FeedbackStyles";

export const StyledFeedbackCard = styled.article`
  ${panelStyles}

  position: relative;

  box-shadow: rgba(0, 0, 0, 0.04) 0px 3px 5px;

  & p {
    text-wrap: wrap;
  }
`;

interface FeedbackCardProps {
  children: ReactNode;
  className?: string;
}
function FeedbackCard({
  children,
  className,
}: FeedbackCardProps): React.JSX.Element {
  return (
    <StyledFeedbackCard className={className}>{children}</StyledFeedbackCard>
  );
}

export default memo(FeedbackCard);
