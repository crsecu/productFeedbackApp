import { memo, ReactNode } from "react";
import styled from "styled-components";
import { Card } from "../../styles/features/FeedbackStyles";
import device from "../../styles/breakpoints";

export const StyledFeedbackCard = styled(Card)`
  & a,
  > div {
    gap: 22px;
  }

  & a div,
  div div {
    max-width: 95%;
  }

  @media ${device.sm} {
    display: flex;
    gap: 36px;
    padding: 28px 22px;

    & a,
    > div {
      flex-direction: row;
      justify-content: space-between;
    }

    & a div,
    div div {
      max-width: 86%;
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
