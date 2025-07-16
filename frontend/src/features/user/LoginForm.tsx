import { MouseEvent, useState } from "react";
import { useFetcher, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authenticateUser } from "../../services/apiAuth";

import device from "../../styles/breakpoints";
import { PrimaryButton } from "../../styles/UIStyles";
import FormField from "../feedback/FormField";
import InputField from "../feedback/InputField";
import { H1 } from "../../styles/Typography";
import { getFeedbackFormResponse } from "../../utils/helpers";
import { FeedbackFormErrors } from "../../types/form.types";
import BannerNotification from "../../ui/notifications/BannerNotification";

export const StyledLoginForm = styled.div<{ $hasError?: boolean }>`
  padding: 10px;

  & p:first-child {
    margin-bottom: 10px;
  }

  & .error {
    color: red;
    padding-bottom: 4px;
  }

  & h1 {
    text-align: center;
    font-size: 2rem;
    padding-bottom: 6px;
  }

  & p {
    color: var(--color-text-muted);
    text-align: center;
  }

  & .formWrapper {
    padding: 34px 20px 40px;
    ${(props) => props.$hasError && `padding-top: 20px`};
  }

  & form button {
    width: 100%;
  }

  & form input {
    margin-top: 4px;
    background-color: var(--color-text-light);
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px,
      rgba(209, 213, 219, 0.736) 0px 0px 0px 1px inset;
  }

  & form input[type="password"] {
    font-size: 1.5rem;
    font-family: monospace;
  }

  @media ${device.sm} {
  }
`;
/* MVP phase of app doesn't support authenticatin
   This component mocks a login process
 */
function LoginForm(): React.JSX.Element {
  const fetcher = useFetcher({ key: "my-key" });
  const navigate = useNavigate();
  const location = useLocation();
  const actionData = fetcher?.data;

  //delete these
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");
  //
  console.log("checking login fetcher", fetcher);
  const { actionType, submissionOutcome } = actionData
    ? getFeedbackFormResponse<{
        accessToken: string;
        id: string;
      }>(actionData)
    : {};

  const errors =
    actionData?.validationErrors ||
    (actionData?.submitError as FeedbackFormErrors);

  const notification =
    submissionOutcome && actionType ? (
      <BannerNotification
        notificationType={submissionOutcome}
        actionType={actionType}
        notificationMsgCustom={true}
      >
        {errors && <p>{errors}.</p>}
      </BannerNotification>
    ) : null;

  async function handleUserLogin(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    console.log("LOCATION HASH ", location);

    if (email === "" && password === "") {
      setValidationError("Empty input fields");
      return;
    } //TO DO: handle input validation

    try {
      const isUserAuthenticated = await authenticateUser({
        email,
        password,
      });

      console.log("I AM VALIDATED", isUserAuthenticated);

      if (isUserAuthenticated) {
        if (location.pathname === "/newUser") {
          navigate("welcome");
          return;
        }
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (typeof error === "string") setValidationError(error);
    }
  }

  return (
    <StyledLoginForm $hasError={!!errors}>
      <H1>Welcome Back</H1>
      <p>Enter your credentials to access your account.</p>
      <div className="formWrapper">
        {notification}
        <fetcher.Form method="post" action=".">
          <FormField
            inputId={"emailSignup"}
            label={"Email"}
            description={""}
            inputGuidanceId={""}
          >
            <InputField
              name={"email"}
              id={"emailSignup"}
              type={"email"}
              onOptionChange={(e) => setEmail(e.target.value)}
            />
          </FormField>
          <FormField
            inputId={"passwordSignup"}
            label={"Password"}
            description={""}
            inputGuidanceId={""}
          >
            <InputField
              name={"password"}
              id={"passwordSignup"}
              type={"password"}
              isRequired={true}
              minLength={6}
              onOptionChange={(e) => setPassword(e.target.value)}
            />
          </FormField>
          <PrimaryButton>Log in</PrimaryButton>
        </fetcher.Form>
      </div>
    </StyledLoginForm>
  );
}

export default LoginForm;
