import { ReactNode, useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import PageHeader from "../../ui/PageHeader";
import TitleCard from "../../ui/TitleCard";

import styled from "styled-components";
import FeedbackBoardSidebar from "./FeedbackBoardSidebar";
import FilterByCategory from "./FilterByCategory";
import device from "../../styles/breakpoints";
import { Overlay } from "../../styles/UIStyles";
import { useMatchMedia } from "../../utils/customHooks";

const StyledFeedbackBoardLeftColumn = styled.div`
  @media ${device.sm} {
    display: flex;
    gap: 10px;
    margin-bottom: 34px;
  }

  @media ${device.lg} {
    flex-direction: column;

    gap: 24px;
    flex-grow: initial;
  }
`;

const SidebarOverlay = styled(Overlay)`
  @media ${device.sm} {
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
  const isMobile = useMatchMedia("(max-width: 639px)");

  useEffect(() => {
    if (!isMobile && showSidebar) {
      setShowSidebar(false);
    }
  }, [isMobile, showSidebar]);

  return (
    <>
      {showSidebar && <SidebarOverlay onClick={() => setShowSidebar(false)} />}
      <StyledFeedbackBoardLeftColumn>
        <PageHeader>
          <TitleCard />
          {isMobile && (
            <IconButton
              onClick={() => setShowSidebar((prevState) => !prevState)}
            >
              {showSidebar ? (
                <IoCloseSharp
                  size={"1.6rem"}
                  strokeWidth={16}
                  className="no-scroll-menu"
                />
              ) : (
                <GiHamburgerMenu size={"1.25rem"} />
              )}
            </IconButton>
          )}
        </PageHeader>

        <FeedbackBoardSidebar
          isOpen={showSidebar}
          ariaLabel="Feedback filters and roadmap"
        >
          <FilterByCategory
            suggestionCount={suggestionCount}
            onFilterSelect={() => setShowSidebar((prevState) => !prevState)}
          />
          {children}
        </FeedbackBoardSidebar>
      </StyledFeedbackBoardLeftColumn>
    </>
  );
}

export default FeedbackBoardLeftColumn;
