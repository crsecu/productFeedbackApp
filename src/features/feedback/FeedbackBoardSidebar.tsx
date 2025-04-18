import { ReactNode } from "react";
import styled from "styled-components";

const StyledFeedbackBoardSidebar = styled.aside<{ $show: boolean }>`
  background-color: #c5c5a4;
  position: absolute;
  right: 0;

  width: ${(props) => (props.$show ? "90%" : 0)};
  height: 100vh;
  transition: all 1s;
  overflow: hidden;
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
  console.log("show", isOpen);
  return (
    <>
      <StyledFeedbackBoardSidebar $show={isOpen} aria-label={ariaLabel}>
        {children}
      </StyledFeedbackBoardSidebar>
    </>
  );
}

export default FeedbackBoardSidebar;
