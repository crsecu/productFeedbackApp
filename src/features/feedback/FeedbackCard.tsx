import { memo, ReactNode } from "react";
import styled from "styled-components";
import device from "../../styles/breakpoints";
import { panelStyles } from "../../styles/features/FeedbackStyles";

const StyledFeedbackCard = styled.div`
  ${panelStyles}

  position: relative;

  & p {
    text-wrap: wrap;
  }

  @media ${device.sm} {
    display: flex;
    gap: 26px;
    padding: 28px 22px;

    & > div,
    a {
      display: flex;
      justify-content: space-between;
      gap: 6px;
      flex-grow: 1;
    }
  }

  @media ${device.md} {
    gap: 36px;
    padding: 28px;
  }
`;

interface FeedbackCardProps {
  children: ReactNode;
}
function FeedbackCard({ children }: FeedbackCardProps): React.JSX.Element {
  return <StyledFeedbackCard>{children}</StyledFeedbackCard>;
}

export default memo(FeedbackCard);
