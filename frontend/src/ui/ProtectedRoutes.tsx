import { Navigate, Outlet, useLoaderData } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "./AppLayout";
import { useAppDispatch, useAppSelector } from "../types/redux.hooks";
import { getLoggedInUser, setUserCredentials } from "../store/slices/userSlice";

import Logout from "../features/user/Logout";
import User from "../features/user/User";
import UserAvatar from "../features/user/UserAvatar";
import UserInfo from "../features/user/UserInfo";
import styled from "styled-components";
import device from "../styles/breakpoints";
import { useMatchMedia } from "../utils/customHooks";
import { RootLoaderdata } from "../types/loader.types";
import { ensureValidSession } from "../services/apiAuth";

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

function ProtectedRoutes(): React.JSX.Element {
  const userAuthData = useLoaderData() as RootLoaderdata;
  const { accessToken, userProfile } = userAuthData;

  const dispatch = useAppDispatch();

  const isMobile = useMatchMedia("(max-width: 639px");
  const user = useAppSelector(getLoggedInUser);

  useEffect(() => {
    console.log("effect running running running");
    if (accessToken === null) {
      console.log("ac", accessToken);
      return;
    }
    if (user.isUserLoggedIn) return;
    if (!userProfile) return;

    async function handleUserAuth() {
      console.log("handleUserAuth running....");
      const accessTokenNew = await ensureValidSession();
      if (!accessTokenNew) return;
      if (!userProfile) return; //this early return is helping TS infer that userProfile is not null
      const { name, username, image } = userProfile;

      if (typeof name === "string" && typeof username === "string") {
        dispatch(
          setUserCredentials({
            name,
            image,
            username,
          })
        );

        return;
      }
    }

    handleUserAuth();
  }, [accessToken, dispatch, user.isUserLoggedIn, userProfile]);

  if (userProfile === null) {
    return <Navigate to="/login/welcome" replace />;
  }

  return (
    <AppLayout>
      {/* authenticated user profile ui component*/}
      {!isMobile && (
        <UserProfileHeader className="userProfileHeader">
          <div>
            <User>
              <UserAvatar imageUrl={"/assets/user-images/image-roxanne.jpg"} />
              <UserInfo
                name={user.profileInfo.name}
                username={user.profileInfo.username}
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
