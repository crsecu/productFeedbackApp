import LoginForm, { AuthFormHeader } from "./LoginForm";
import { FormPage, GoBackLinkButton, panelStyles } from "../../styles/UIStyles";
import styled from "styled-components";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";

import Logo from "../../ui/Logo";
import NewUser from "./NewUser";
import { H1 } from "../../styles/Typography";
import device from "../../styles/breakpoints";
const PageWrapper = styled(FormPage)`
  position: relative;

  display: flex;
  gap: 0;
  padding: 0;
  margin: auto;
  width: 100vw;
  height: 100dvh;

  & > div:first-child {
    margin: 60px auto 80px auto;
  }

  & form {
    & div:last-of-type {
      margin-bottom: 34px;
    }
  }

  @media ${device.md} {
    ${panelStyles}
    padding: 0 0 0 42px;
    box-shadow: rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px;
    flex-direction: row-reverse;
    justify-content: space-between;
    height: fit-content;
    position: fixed;
    inset: 0px;
    min-width: 600px;
    max-width: 700px;
    margin: auto;

    & > div:first-child {
      position: absolute;
      margin: 0;
      bottom: 12px;
      right: 12px;
    }
  }

  @media ${device.xxl} {
    max-width: 800px;
    height: 65dvh;
  }
`;

const RightColumn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;

  border-radius: inherit;

  @media ${device.sm} {
    background-image: url("/assets/blobMobile.png");
    background-repeat: no-repeat;
    background-position: bottom;
    background-size: cover;
  }

  @media ${device.md} {
    width: 50%;

    background-image: url("/assets/blob.png");
    background-position: 4% 50%;
  }
`;

const LeftColumn = styled.div`
  padding: 16px 36px;

  @media (max-width: 768px) {
    flex-grow: 1;
    background-color: var(--color-surface);
    border-radius: 30px 30px 0 0;
    margin-top: -14px;
    z-index: -1;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  @media ${device.md} {
    padding: 30px 0;
    display: flex;
    flex-direction: column;
    min-width: fit-content;
  }

  @media ${device.xxl} {
    padding: 70px 0;
  }
`;

export const UserCTA = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3px;
  font-size: var(--text-sm);
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
      <Logo />

      <RightColumn />
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
              Don't have an account?
              <AuthLinkButton to="signup" replace>
                Sign up
              </AuthLinkButton>
            </UserCTA>
          </>
        ) : (
          <Outlet />
        )}
      </LeftColumn>
    </PageWrapper>
  );
}

export default LoginPage;
