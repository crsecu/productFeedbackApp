import { ReactNode, useCallback, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import PageHeader from "../../ui/PageHeader";
import TitleCard from "./TitleCard";

import styled from "styled-components";
import FeedbackBoardSidebar from "./FeedbackBoardSidebar";
import FilterByCategory from "./FilterByCategory";
import device from "../../styles/breakpoints";

const StyledFeedbackBoardLeftColumn = styled.div`
  overflow: hidden;

  @media ${device.md} {
    display: flex;
    gap: 8px;
    margin-bottom: 34px;
  }

  @media ${device.lg} {
    flex-direction: column;
    width: 24%;
    gap: 24px;
  }
`;

const Overlay = styled.div`
  position: fixed;
  z-index: 1;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;

  @media ${device.md} {
    display: none;
  }
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  display: flex;
  align-items: center;
  color: var(--color-text-light);
`;

interface FeedbackBoardLeftColumnProps {
  children: ReactNode;
  suggestionCount: number;
}
function FeedbackBoardLeftColumn({
  children,
  suggestionCount,
}: FeedbackBoardLeftColumnProps): React.JSX.Element {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebarVisibility = useCallback(() => {
    setShowSidebar((prevState) => !prevState);

    if (showSidebar) {
      document.body.classList.remove("no-scroll");
    } else {
      document.body.classList.add("no-scroll");
    }
  }, [showSidebar]);

  return (
    <>
      {showSidebar && <Overlay onClick={() => setShowSidebar(false)} />}
      <StyledFeedbackBoardLeftColumn>
        <PageHeader>
          <TitleCard />
          {showSidebar ? (
            <IconButton onClick={handleSidebarVisibility}>
              <IoCloseSharp size={"1.6rem"} strokeWidth={16} />
            </IconButton>
          ) : (
            <IconButton onClick={handleSidebarVisibility}>
              <GiHamburgerMenu size={"1.25rem"} />
            </IconButton>
          )}
        </PageHeader>

        <FeedbackBoardSidebar
          isOpen={showSidebar}
          ariaLabel="Feedback filters and roadmap"
        >
          <FilterByCategory
            suggestionCount={suggestionCount}
            onFilterSelect={handleSidebarVisibility}
          />
          {children}
        </FeedbackBoardSidebar>
      </StyledFeedbackBoardLeftColumn>
    </>
  );
}

export default FeedbackBoardLeftColumn;
