import LoginForm, { AuthFormHeader } from "./LoginForm";
import { FormPage, GoBackLinkButton, panelStyles } from "../../styles/UIStyles";
import styled from "styled-components";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";

import Logo from "../../ui/Logo";
import NewUser from "./NewUser";
import { H1 } from "../../styles/Typography";
import device from "../../styles/breakpoints";
const PageWrapper = styled(FormPage)`
  ${panelStyles}
  gap: 40px;
  justify-content: center;
  height: 100%;
  margin: auto;
  width: 100vw;
  flex-direction: column-reverse;

  & form {
    & div:last-of-type {
      margin-bottom: 34px;
    }
  }

  @media ${device.md} {
    flex-direction: row;
    width: 90%;
  }
`;

const LeftColumn = styled.div`
  @media ${device.md} {
    width: 55%;
    padding: 20px;
    /* padding: 80px 40px; */
  }
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: space-around;

  @media ${device.md} {
    width: 45%;
  }
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
