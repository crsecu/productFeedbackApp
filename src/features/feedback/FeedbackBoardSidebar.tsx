import { ReactNode } from "react";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledFeedbackBoardSidebar = styled.aside<{ $show: boolean }>`
  background-color: var(--color-background);
  position: absolute;
  z-index: 2;
  right: 0;

  width: ${(props) => (props.$show ? "75%" : 0)};
  height: 100vh;
  transition: all 1s;
  overflow: hidden;
  padding: ${(props) => (props.$show ? "25px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${device.md} {
    position: initial;
    width: auto;

    height: initial;
    flex-direction: row;
    gap: 8px;
    padding: 0;

    & section {
      border-radius: var(--border-radius-sm);
      //flex-basis: 250px;
      flex: 1;
    }
  }

  @media ${device.lg} {
    flex-direction: column;
  }
`;

interface FeedbackBoardSidebarProps {
  children: ReactNode;
  ariaLabel: string;
  isOpen: boolean;
}

function FeedbackBoardSidebar({
  children,
  isOpen,
  ariaLabel,
}: FeedbackBoardSidebarProps): React.JSX.Element {
  return (
    <>
      <StyledFeedbackBoardSidebar $show={isOpen} aria-label={ariaLabel}>
        {children}
      </StyledFeedbackBoardSidebar>
    </>
  );
}

export default FeedbackBoardSidebar;
