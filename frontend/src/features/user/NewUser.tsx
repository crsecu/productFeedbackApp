import { AuthFormHeader } from "./LoginForm";

import { H1 } from "../../styles/Typography";
import { FormPage } from "../../styles/UIStyles";

function NewUser(): React.JSX.Element {
  return (
    <FormPage>
      <AuthFormHeader $paddingBottom="0">
        <H1>Thank you for confirming your email address.</H1>
        <p>
          Please enter you login credentials to continue setting up your
          account.
        </p>
      </AuthFormHeader>
    </FormPage>
  );
}

export default NewUser;
