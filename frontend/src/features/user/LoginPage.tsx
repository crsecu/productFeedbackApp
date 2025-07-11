import LoginForm from "./LoginForm";
import { GoBackLinkButton } from "../../styles/UIStyles";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Signup from "./Signup";

export const AuthLinkButton = styled(GoBackLinkButton)`
  background: none;
  color: var(--color-primary);
  padding: 0;

  &:hover {
    text-decoration: none;
    color: var(--color-primary-hover);
  }
`;

function LoginPage(): React.JSX.Element {
  const location = useLocation();

  return (
    <>
      {location.pathname === "/login/signup" ? (
        <Signup>
          <LoginForm />
        </Signup>
      ) : (
        <>
          <LoginForm />
          <p>Don't have an account?</p>
          <AuthLinkButton to="signup" replace>
            Sign up
          </AuthLinkButton>
        </>
      )}
    </>
  );
}

export default LoginPage;
