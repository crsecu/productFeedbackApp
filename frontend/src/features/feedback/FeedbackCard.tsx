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
    & a,
    > div {
      flex-direction: row;
      justify-content: space-between;
      padding-left: 110px;
    }

    & a div,
    div div {
      max-width: 86%;
    }

    & button {
      min-width: 40px;
      height: 56px;
      left: 30px;
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
