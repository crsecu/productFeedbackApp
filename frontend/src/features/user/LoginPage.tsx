import { useState } from "react";
import LoginForm from "./LoginForm";
import Signup from "./Signup";
import { GoBackButton } from "../../styles/UIStyles";
import styled from "styled-components";
import { useFetcher } from "react-router-dom";
import { ActionResult } from "../../types/action.types";
import { UserSB } from "../../types/supabaseAuth.types";
import { getFeedbackFormResponse } from "../../utils/helpers";
import ActionBar from "../../ui/ActionBar";
import BannerNotification from "../../ui/notifications/BannerNotification";

const ButtonCTA = styled(GoBackButton)`
  background: none;
  color: var(--color-primary);
  padding: 0;

  &:hover {
    text-decoration: none;
    color: var(--color-primary-hover);
  }
`;
function LoginPage(): React.JSX.Element {
  const [mode, setMode] = useState<"signup" | "login">("login");
  const fetcher = useFetcher<ActionResult<UserSB>>();

  const { actionType, submissionOutcome, isSubmissionSuccessful } = fetcher.data
    ? getFeedbackFormResponse<UserSB>(fetcher.data)
    : {};

  console.log("f in parent", fetcher);

  const notification =
    submissionOutcome && actionType ? (
      <BannerNotification
        notificationType={submissionOutcome}
        actionType={actionType}
      ></BannerNotification>
    ) : null;

  return (
    <>
      {mode === "login" || isSubmissionSuccessful ? (
        <>
          {isSubmissionSuccessful && notification}
          <LoginForm />
          <br />
          {!isSubmissionSuccessful && (
            <>
              <p>Don't have an account?</p>
              <ButtonCTA onClick={() => setMode("signup")}>Sign up</ButtonCTA>
            </>
          )}
        </>
      ) : (
        <>
          <ActionBar isMinimal={true}>
            <GoBackButton onClick={() => setMode("login")}>
              Go Back
            </GoBackButton>
          </ActionBar>

          <Signup fetcher={fetcher}>{notification}</Signup>
        </>
      )}
    </>
  );
}
export default LoginPage;
