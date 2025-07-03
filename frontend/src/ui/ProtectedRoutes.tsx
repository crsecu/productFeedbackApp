import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "./AppLayout";
import LoginPage from "../features/user/LoginPage";
import { useAppSelector } from "../types/redux.hooks";
import { getLoggedInUser } from "../store/slices/userSlice";

function ProtectedRoutes(): React.JSX.Element {
  const navigate = useNavigate();
  const isUserAuth = useLoaderData() as boolean;
  const user = useAppSelector(getLoggedInUser);

  console.log("isUserAuth - ProtectedRoutes", isUserAuth);
  console.log("user", user);

  useEffect(() => {
    if (isUserAuth) return;

    navigate("/login", { replace: true });
  }, [isUserAuth, navigate]);

  return (
    <>
      {isUserAuth ? (
        <AppLayout>
          <p>
            Logged in: {user.isUserLoggedIn ? user.profileInfo.name : "none"}
          </p>
          <Outlet />
        </AppLayout>
      ) : (
        <LoginPage />
      )}
    </>
  );
}

export default ProtectedRoutes;
