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
  gap: 0;
  padding: 0;
  margin: auto;
  width: 100vw;

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
    height: 90dvh;
    position: fixed;
    inset: 0px;
    min-width: 600px;
    max-width: 700px;
    margin: auto;
  }

  @media ${device.xxl} {
    max-width: 800px;
    height: 85dvh;
  }
`;

const RightColumn = styled.div`
  display: flex;
  align-items: center;
  height: 200px;
  background-image: url("/assets/blobMobile.png");
  background-repeat: no-repeat;
  background-position: bottom;
  background-size: cover;
  border-radius: inherit;

  & > div {
    position: absolute;

    width: 140px;
    top: 80px;
    left: 10px;
  }

  @media ${device.md} {
    width: 50%;
    height: 100%;
    background-image: url("/assets/blob.png");
    background-position: 4% center;

    & > div {
      opacity: inherit;
      top: 12px;
      left: 12px;
    }
  }
`;

const LeftColumn = styled.div`
  padding: 16px 36px;

  @media ${device.md} {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-width: fit-content;
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
      <RightColumn>
        <Logo />
      </RightColumn>

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
    </PageWrapper>
  );
}

export default LoginPage;
