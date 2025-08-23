import { Form, Navigate, useFetcher } from "react-router-dom";
import FormField from "../../ui/form/FormField";
import InputField from "../../ui/form/InputField";
import { PrimaryButton } from "../../styles/UIStyles";

import { UserProfile } from "../../types/user.types";
import { AuthFormHeader, StyledLoginForm } from "./LoginForm";
import { H1 } from "../../styles/Typography";

function WelcomeUser(): React.JSX.Element {
  const fetcher = useFetcher({ key: "welcome-fetcher" });
  const fetcherData = fetcher.data?.payload as UserProfile;

  if (fetcherData) return <Navigate to="/" replace />;

  return (
    <>
      <AuthFormHeader>
        <H1>Just a few details to complete your setup</H1>
        <p>This will only take a moment</p>
      </AuthFormHeader>
      <StyledLoginForm>
        <Form
          method="post"
          action="."
          navigate={false}
          fetcherKey="welcome-fetcher"
        >
          <FormField
            inputId={"nameSignup"}
            label={"Full Name"}
            description={"Your first and last name"}
            inputGuidanceId={""}
          >
            <InputField
              name={"name"}
              id={"nameSignup"}
              type={"text"}
              // validationError={errors}
            />
          </FormField>
          <FormField
            inputId={"usernameSignup"}
            label={"Username"}
            description={"Your username"}
            inputGuidanceId={""}
          >
            <InputField
              name={"username"}
              id={"usernameSignup"}
              type={"text"}
              // validationError={errors}
            />
          </FormField>
          <PrimaryButton type="submit">Save profile</PrimaryButton>
        </Form>
      </StyledLoginForm>
    </>
  );
}

export default WelcomeUser;
