import { useFetcher } from "react-router-dom";
import InputField from "../feedback/InputField";
import FormField from "../feedback/FormField";
import {
  FormPage,
  FormSection,
  GoBackLinkButton,
  PrimaryButton,
} from "../../styles/UIStyles";
import { UserSB } from "../../types/supabaseAuth.types";
import styled from "styled-components";
import device from "../../styles/breakpoints";
import Logo from "../../ui/Logo";
import { ReactNode } from "react";
import { ActionResult } from "../../types/action.types";
import { getFeedbackFormResponse } from "../../utils/helpers";
import BannerNotification from "../../ui/notifications/BannerNotification";
import { AuthLinkButton } from "./LoginPage";

const PageWrapper = styled(FormPage)`
  width: unset;

  gap: 20px;

  & a {
    width: 90vw;
    margin: 0 auto;
  }

  & form {
    display: flex;
    flex-direction: column;

    & div:last-of-type {
      margin-bottom: 34px;
    }
  }
`;

const LoginCTA = styled.p`
  font-size: var(--text-sm);
  text-align: center;
  margin-top: 16px;

  & a {
    font-weight: var(--font-weight-semibold);
    color: var(--color-primary);
  }
`;
const StyledSignupPage = styled.div`
  & > section:first-of-type {
    border-radius: 16px 16px 0 0;
    box-shadow: rgba(173, 31, 234, 0.212) 0px 2px 4px 0px inset;
  }

  @media ${device.sm} {
    display: flex;
  }
`;

const LeftColumn = styled.div`
  flex: 1;
`;

const RightColumn = styled.div`
  flex: 1;
`;

interface SignupProps {
  children?: ReactNode;
}

function Signup({ children }: SignupProps): React.JSX.Element {
  const fetcher = useFetcher<ActionResult<UserSB>>();
  const actionData = fetcher?.data;

  const { actionType, submissionOutcome, isSubmissionSuccessful } = actionData
    ? getFeedbackFormResponse<UserSB>(actionData)
    : {};

  const notification =
    submissionOutcome && actionType ? (
      <BannerNotification
        notificationType={submissionOutcome}
        actionType={actionType}
      ></BannerNotification>
    ) : null;

  console.log("props from parent through outlet", fetcher);

  if (isSubmissionSuccessful) {
    return (
      <>
        {notification} {children}
      </>
    );
  }

  return (
    <PageWrapper>
      <GoBackLinkButton to="..">Go back</GoBackLinkButton>
      <StyledSignupPage>
        <LeftColumn>
          <Logo />
        </LeftColumn>

        <RightColumn>
          <FormSection>
            {notification}
            <br />
            <fetcher.Form method="post" action="/login/signup">
              <FormField
                inputId={"fullNameSignup"}
                label={"Full Name"}
                description={"Your first and last name"}
                inputGuidanceId={""}
              >
                <InputField
                  name={"name"}
                  id={"nameSignup"}
                  type={"text"}
                  validationError={actionData?.validationErrors?.name}
                />
              </FormField>
              <FormField
                inputId={"emailSignup"}
                label={"Email"}
                description={"Your email address"}
                inputGuidanceId={""}
              >
                <InputField
                  name={"email"}
                  id={"emailSignup"}
                  type={"email"}
                  validationError={actionData?.validationErrors?.email}
                />
              </FormField>
              <FormField
                inputId={"passwordSignup"}
                label={"Password"}
                description={"Your password"}
                inputGuidanceId={""}
              >
                <InputField
                  name={"password"}
                  id={"passwordSignup"}
                  type={"password"}
                  validationError={actionData?.validationErrors?.password}
                  isRequired={true}
                  minLength={6}
                />
              </FormField>
              <PrimaryButton type="submit">Create account</PrimaryButton>
            </fetcher.Form>
            <LoginCTA>
              Already have an account?{" "}
              <AuthLinkButton to=".." replace>
                Log in
              </AuthLinkButton>
            </LoginCTA>
          </FormSection>
        </RightColumn>
      </StyledSignupPage>
    </PageWrapper>
  );
}

export default Signup;
