import { ReactNode } from "react";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledFeedbackBoardSidebar = styled.aside<{ $show: boolean }>`
  background-color: var(--color-background);
  position: absolute;
  z-index: 2;
  right: 0;

  width: ${(props) => (props.$show ? "75%" : 0)};
  max-width: 270px;
  height: 100vh;
  transition: all 1s;
  overflow: hidden;
  padding: ${(props) => (props.$show ? "25px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${device.sm} {
    position: initial;
    height: initial;
    flex-direction: row;
    flex-grow: 1;
    max-width: initial;
    gap: 10px;

    & section {
      border-radius: var(--border-radius-sm);

      &:last-of-type {
        flex-grow: 1;
      }
    }
  }

  @media ${device.md} {
    & section:first-child {
      flex-grow: 1;
    }
    & section:last-child {
      flex-grow: 10;
    }
  }

  @media ${device.lg} {
    flex-direction: column;
    flex-grow: initial;
    width: 240px;
    gap: 24px;
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
