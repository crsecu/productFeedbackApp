import { memo, ReactNode } from "react";
import styled from "styled-components";
import { Card, panelStyles } from "../../styles/features/FeedbackStyles";
import device from "../../styles/breakpoints";

export const StyledFeedbackCard = styled(Card)`
  ${panelStyles}

  & a, > div {
    gap: 22px;
  }

  @media ${device.sm} {
    display: flex;
    gap: 36px;
    padding: 28px 22px;

    & a,
    > div {
      flex-direction: row;
      gap: 50px;
    }
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
