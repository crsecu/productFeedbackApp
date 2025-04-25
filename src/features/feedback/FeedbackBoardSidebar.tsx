import { ReactNode } from "react";
import styled from "styled-components";

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
  row-gap: 24px;
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
