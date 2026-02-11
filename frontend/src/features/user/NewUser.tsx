import { AuthFormHeader } from "./LoginForm";

import { H1 } from "../../styles/Typography";
import { BiSolidCheckCircle } from "react-icons/bi";

function NewUser(): React.JSX.Element {
  return (
    <AuthFormHeader>
      <H1>Email confirmed!</H1> <BiSolidCheckCircle size={24} />
      <p>Log in to continue setting up your account.</p>
    </AuthFormHeader>
  );
}

export default NewUser;
