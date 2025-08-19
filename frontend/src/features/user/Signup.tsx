import { useFetcher } from "react-router-dom";
import InputField from "../feedback/InputField";
import FormField from "../feedback/FormField";
import { PrimaryButton } from "../../styles/UIStyles";
import { UserSB } from "../../types/supabaseAuth.types";
import styled from "styled-components";
import { ActionResult } from "../../types/action.types";
import { getFeedbackFormResponse } from "../../utils/helpers";
import BannerNotification from "../../ui/notifications/BannerNotification";
import { AuthLinkButton, UserCTA } from "./LoginPage";
import { AuthFormHeader, StyledLoginForm } from "./LoginForm";
import { H1 } from "../../styles/Typography";

const StyledSignupPage = styled(StyledLoginForm)`
  & > section:first-of-type {
    border-radius: 16px 16px 0 0;
    box-shadow: rgba(173, 31, 234, 0.212) 0px 2px 4px 0px inset;
  }
`;

function Signup(): React.JSX.Element {
  const fetcher = useFetcher<ActionResult<UserSB>>();
  const actionData = fetcher?.data;

  const {
    actionType,
    submissionOutcome,
    isSubmissionSuccessful,
    validationErrors,
    submitError,
  } = actionData ? getFeedbackFormResponse<UserSB>(actionData) : {};

  console.log("ac", actionData);

  const notification =
    submissionOutcome && actionType ? (
      <BannerNotification
        notificationType={submissionOutcome}
        actionType={actionType}
        notificationMsgCustom={submissionOutcome !== "success" ? true : false}
      >
        <p>{submitError as string}</p>
      </BannerNotification>
    ) : null;

  if (isSubmissionSuccessful) {
    return <>{notification}</>;
  }

  return (
    <StyledSignupPage>
      <AuthFormHeader>
        <H1>Create your account</H1>
        <p>Start sharing feedback and supporting great ideas</p>
      </AuthFormHeader>

      {notification}

      <fetcher.Form method="post" action="/login/signup">
        {/* <FormField
                inputId={"nameSignup"}
                label={"Full Name"}
                description={"Your first and last name"}
                inputGuidanceId={""}
              >
                <InputField
                  name={"name"}
                  id={"nameSignup"}
                  type={"text"}
                  validationError={errors}
                />
              </FormField> */}
        {/* <FormField
                inputId={"usernameSignup"}
                label={"Username"}
                description={"Your username"}
                inputGuidanceId={""}
              >
                <InputField
                  name={"username"}
                  id={"usernameSignup"}
                  type={"text"}
                  validationError={errors}
                />
              </FormField> */}
        <FormField inputId={"emailSignup"} label={"Email"} inputGuidanceId={""}>
          <InputField
            name={"email"}
            id={"emailSignup"}
            type={"email"}
            validationError={validationErrors ? validationErrors : undefined}
            placeHolderText={"Your email address"}
          />
        </FormField>
        <FormField
          inputId={"passwordSignup"}
          label={"Password"}
          inputGuidanceId={""}
        >
          <InputField
            name={"password"}
            id={"passwordSignup"}
            type={"password"}
            validationError={validationErrors ? validationErrors : undefined}
            isRequired={true}
            minLength={6}
            placeHolderText={"Your password"}
          />
        </FormField>
        <PrimaryButton type="submit">Create account</PrimaryButton>
      </fetcher.Form>
      <UserCTA>
        Already have an account?{" "}
        <AuthLinkButton to=".." replace>
          Log in
        </AuthLinkButton>
      </UserCTA>
    </StyledSignupPage>
  );
}

export default Signup;
