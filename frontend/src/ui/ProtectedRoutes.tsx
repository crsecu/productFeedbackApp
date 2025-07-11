import { Navigate, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "./AppLayout";

import { useAppDispatch, useAppSelector } from "../types/redux.hooks";
import { getLoggedInUser, setUserCredentials } from "../store/slices/userSlice";
import { getUserProfileInfo } from "../services/apiAuth";
import Logout from "../features/user/Logout";

function ProtectedRoutes(): React.JSX.Element {
  const navigate = useNavigate();
  const userAuthData = useLoaderData() as string | null;
  const dispatch = useAppDispatch();

  const user = useAppSelector(getLoggedInUser);

  useEffect(() => {
    console.log("effect running running running");
    if (userAuthData === null) return;
    if (user.isUserLoggedIn) return;
    const authToken = userAuthData;

    async function handleUserAuth() {
      console.log("handleUserAuth running....");
      const loggedInUser = await getUserProfileInfo(authToken);
      const { name, username, image } = loggedInUser;
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
  }, [dispatch, navigate, user.isUserLoggedIn, userAuthData]);

  if (!userAuthData) {
    console.log("I should navigate to login now");
    return <Navigate to="/login" replace />;
  }

  return (
    <AppLayout>
      <p>
        Logged in: {user.isUserLoggedIn ? user.profileInfo.name : "none"}{" "}
        <Logout />
      </p>
      <Outlet />
    </AppLayout>
  );
}

export default ProtectedRoutes;
