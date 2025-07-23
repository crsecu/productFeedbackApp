import { Navigate, Outlet } from "react-router-dom";
import AppLayout from "./AppLayout";
import { useAppSelector } from "../types/redux.hooks";
import { getLoggedInUser } from "../store/slices/userSlice";

import Logout from "../features/user/Logout";
import User from "../features/user/User";
import UserAvatar from "../features/user/UserAvatar";
import UserInfo from "../features/user/UserInfo";
import styled from "styled-components";
import device from "../styles/breakpoints";
import { useMatchMedia } from "../utils/customHooks";

export const UserProfileHeader = styled.div`
  @media ${device.sm} {
    display: block;
    background-color: var(--color-surface);
    padding: 4px 20px;
    box-shadow: rgba(17, 17, 26, 0.1) 0px 1px 0px;
    margin-bottom: 4px;

    & > div {
      display: flex;
      margin-left: auto;
      gap: 20px;
      width: fit-content;
      border-radius: inherit;
      padding: 0 4px;
    }

    & > div > div {
      margin-bottom: 0;
      font-size: var(--text-sm);
      color: var(--color-muted);
    }
    & img {
      height: 36px;
    }
  }
`;

function ProtectedRoutes(): React.JSX.Element | null {
  const userProfileRedux = useAppSelector(getLoggedInUser);

  const isMobile = useMatchMedia("(max-width: 639px");

  if (!userProfileRedux.isUserLoggedIn) return <Navigate to="/" replace />;

  const userProfile = userProfileRedux.profileInfo;

  return (
    <AppLayout>
      {/* authenticated user profile ui component*/}
      {!isMobile && (
        <UserProfileHeader className="userProfileHeader">
          <div>
            <User>
              <UserAvatar imageUrl={"/assets/user-images/image-roxanne.jpg"} />
              <UserInfo
                name={userProfile.name}
                username={userProfile.username}
              />
            </User>
            <Logout />
          </div>
        </UserProfileHeader>
      )}
      <Outlet />
    </AppLayout>
  );
}

export default ProtectedRoutes;
