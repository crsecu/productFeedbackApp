import { Outlet, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";

function NewUser(): React.JSX.Element {
  const location = useLocation();

  if (location.pathname === "/newUser/welcome") return <Outlet />;
  return (
    <div>
      <p>Thank you for confirming your e-mail address.</p>
      <p>
        Please enter you login credentials to continue setting up your account
      </p>
      <LoginForm />
    </div>
  );
}

export default NewUser;
