import LoginForm, { AuthFormHeader } from "./LoginForm";
import { FormPage, GoBackLinkButton, panelStyles } from "../../styles/UIStyles";
import styled from "styled-components";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";

import Logo from "../../ui/Logo";
import NewUser from "./NewUser";
import { H1 } from "../../styles/Typography";
const PageWrapper = styled(FormPage)`
  ${panelStyles}
  width: 80%;
  gap: 0;
  flex-direction: row;
  height: 100%;
  margin: auto;

  & a {
    width: 90vw;
    margin: auto;
  }

  & form {
    & div:last-of-type {
      margin-bottom: 34px;
    }
  }
`;

const LeftColumn = styled.div`
  width: 55%;
  padding: 80px 40px;
`;

const RightColumn = styled.div`
  width: 45%;
`;

export const UserCTA = styled.p`
  font-size: var(--text-sm);
  text-align: center;
  margin-top: 16px;

  & a {
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }
`;

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
  const loaderData = useLoaderData();
  const location = useLocation();

  return (
    <PageWrapper>
      <LeftColumn>
        {location.pathname === "/login" ? (
          <>
            {loaderData === "newUser" ? (
              <NewUser />
            ) : (
              <AuthFormHeader>
                <H1>Welcome Back</H1>
                <p>Enter your credentials to access your account</p>
              </AuthFormHeader>
            )}

            <LoginForm />
            <UserCTA>
              Don't have an account?{" "}
              <AuthLinkButton to="signup" replace>
                Sign up
              </AuthLinkButton>
            </UserCTA>
          </>
        ) : (
          <Outlet />
        )}
      </LeftColumn>
      <RightColumn>
        <Logo />
      </RightColumn>
    </PageWrapper>
  );
}

export default LoginPage;
