import { ReactNode, useCallback, useState } from "react";
import PageHeader from "../../ui/PageHeader";
import TitleCard from "./TitleCard";

import styled from "styled-components";
import FeedbackBoardSidebar from "./FeedbackBoardSidebar";
import FilterByCategory from "./FilterByCategory";

const StyledFeedbackBoardLeftColumn = styled.div`
  overflow: hidden;
`;

const HamburgerButton = styled.button``;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
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
          <HamburgerButton onClick={handleSidebarVisibility}>
            Open
          </HamburgerButton>
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
