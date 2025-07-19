import { Navigate, useFetcher } from "react-router-dom";
import styled from "styled-components";

import device from "../../styles/breakpoints";
import { PrimaryButton } from "../../styles/UIStyles";
import FormField from "../feedback/FormField";
import InputField from "../feedback/InputField";
import { getFeedbackFormResponse } from "../../utils/helpers";
import { FeedbackFormErrors } from "../../types/form.types";
import BannerNotification from "../../ui/notifications/BannerNotification";

export const StyledLoginForm = styled.div<{ $hasError?: boolean }>`
  & > div:first-child {
    ${(props) => props.$hasError && `padding-bottom: 20px`};
  }

  & p:first-child {
    margin-bottom: 10px;
  }

  & .error {
    color: red;
    padding-bottom: 4px;
  }

  & form {
    padding: 0 40px;
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

export const AuthFormHeader = styled.div<{ $paddingBottom?: string }>`
  padding-bottom: ${(props) =>
    props.$paddingBottom ? props.$paddingBottom : `40px`};

  & h1 {
    text-align: center;
    font-size: 2rem;
    padding-bottom: 6px;
    margin: 0;
  }

  & p {
    color: var(--color-text-muted);
    text-align: center;
  }
`;

function LoginForm(): React.JSX.Element {
  const fetcher = useFetcher({ key: "my-key" });
  const actionData = fetcher?.data;
  console.log("login form fetcher", actionData);

  const { actionType, submissionOutcome } = actionData
    ? getFeedbackFormResponse<{
        accessToken: string;
        id: string;
      }>(actionData)
    : {};

  if (submissionOutcome === "success") return <Navigate to="/" replace />;

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

  return (
    <StyledLoginForm $hasError={!!errors}>
      {notification}
      <fetcher.Form method="post" action=".">
        <FormField
          inputId={"emailSignup"}
          label={"Email"}
          description={""}
          inputGuidanceId={""}
        >
          <InputField name={"email"} id={"emailSignup"} type={"email"} />
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
          />
        </FormField>
        <PrimaryButton>Log in</PrimaryButton>
      </fetcher.Form>
    </StyledLoginForm>
  );
}

export default LoginForm;
