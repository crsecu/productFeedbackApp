import { Outlet, useFetcher, useLocation } from "react-router-dom";
import LoginForm from "./LoginForm";
import WelcomeUser from "./WelcomeUser";

function NewUser(): React.JSX.Element {
  const location = useLocation();
  const fetcher = useFetcher({ key: "my-key" });
  console.log("try", fetcher);

  //if (location.pathname === "/newUser/welcome") return <Outlet />;
  if (fetcher.data === "createUserProfile") {
    return <WelcomeUser />;
  }
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
