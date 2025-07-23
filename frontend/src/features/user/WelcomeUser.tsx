import { Form, Navigate, useFetcher } from "react-router-dom";
import FormField from "../feedback/FormField";
import InputField from "../feedback/InputField";
import { FormPage, FormSection, PrimaryButton } from "../../styles/UIStyles";

import { UserProfile } from "../../types/user.types";
import { AuthFormHeader } from "./LoginForm";
import { H1 } from "../../styles/Typography";

function WelcomeUser(): React.JSX.Element {
  const fetcher = useFetcher({ key: "welcome-fetcher" });
  const fetcherData = fetcher.data?.payload as UserProfile;

  if (fetcherData) return <Navigate to="/" replace />;

  return (
    <FormPage>
      <FormSection>
        <AuthFormHeader>
          <H1>Just a few details to complete your setup</H1>
          <p>This will only take a moment</p>
        </AuthFormHeader>
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
      </FormSection>
    </FormPage>
  );
}

export default WelcomeUser;
