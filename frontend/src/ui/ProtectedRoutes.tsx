import LoginForm from "../features/user/LoginForm";
import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import AppLayout from "./AppLayout";

function ProtectedRoutes(): React.JSX.Element {
  const navigate = useNavigate();
  const isUserAuth = useLoaderData();
  console.log("isUserAuth - ProtectedRoutes", isUserAuth);

  useEffect(() => {
    if (isUserAuth) return;

    navigate("/login", { replace: true });
  }, [isUserAuth, navigate]);

  return (
    <>
      {isUserAuth ? (
        <AppLayout>
          <Outlet />
        </AppLayout>
      ) : (
        <>
          <h1>Welcome to Product Feedback app</h1>
          <LoginForm />
        </>
      )}
    </>
  );
}

export default ProtectedRoutes;
