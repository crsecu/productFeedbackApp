import LoginForm from "./LoginForm";
import { FormPage, GoBackLinkButton, panelStyles } from "../../styles/UIStyles";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

import Signup from "./Signup";
import Logo from "../../ui/Logo";
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
  padding: 80px 30px;
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
  const location = useLocation();

  return (
    <PageWrapper>
      <LeftColumn>
        {location.pathname === "/login/signup" ? (
          <Signup>
            <LoginForm />
          </Signup>
        ) : (
          <>
            <LoginForm />
            <UserCTA>
              Don't have an account?{" "}
              <AuthLinkButton to="signup" replace>
                Sign up
              </AuthLinkButton>
            </UserCTA>
          </>
        )}
      </LeftColumn>
      <RightColumn>
        <Logo />
      </RightColumn>
    </PageWrapper>
  );
}

export default LoginPage;
