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
import { useAppSelector } from "../../types/redux.hooks";
import { getLoggedInUser } from "../../store/slices/userSlice";
import Logout from "../user/Logout";
import User from "../user/User";
import UserAvatar from "../user/UserAvatar";
import UserInfo from "../user/UserInfo";

const StyledFeedbackBoardLeftColumn = styled.div`
  @media ${device.sm} {
    display: flex;
    gap: 10px;
    margin-bottom: 30px;
  }

  @media ${device.md} {
  }

  @media ${device.lg} {
    flex-direction: column;

    gap: 20px;
    flex-grow: initial;
    margin-bottom: 0;
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
const UserProfileWrapper = styled.div`
  display: flex;

  justify-content: space-between;

  border-radius: inherit;
  padding: 0 4px;

  & > div {
    margin-bottom: 0;
  }
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
  const isTabletUp = useMatchMedia(device.sm);
  const user = useAppSelector(getLoggedInUser);

  useEffect(() => {
    if (isTabletUp && showSidebar) {
      setShowSidebar(false);
    }
  }, [isTabletUp, showSidebar]);

  return (
    <>
      {showSidebar && <SidebarOverlay onClick={() => setShowSidebar(false)} />}
      <StyledFeedbackBoardLeftColumn>
        <PageHeader>
          <TitleCard />
          {!isTabletUp && (
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
          {user.isUserLoggedIn && !isTabletUp && (
            <UserProfileWrapper>
              <User>
                <UserAvatar imageUrl={user.profileInfo.image} />
                <UserInfo
                  name={user.profileInfo.name}
                  username={user.profileInfo.username}
                />
              </User>
              <Logout />
            </UserProfileWrapper>
          )}
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
