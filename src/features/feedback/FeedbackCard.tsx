import { memo, ReactNode } from "react";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledFeedbackCard = styled.div`
  position: relative;
  background-color: var(--color-surface);
  border-radius: var(--border-radius);

  padding: 28px;

  & p {
    text-wrap: wrap;
  }

  @media ${device.sm} {
    display: flex;
    gap: 26px;
    padding: 28px 22px;

    & a {
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
