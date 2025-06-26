import { MouseEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authenticateUser } from "../../services/apiAuth";

const StyledLoginForm = styled.div`
  padding: 10px;
  & p:first-child {
    margin-bottom: 10px;
  }

  & .error {
    color: red;
    padding-bottom: 4px;
  }
`;
/* MVP phase of app doesn't support authenticatin
   This component mocks a login process
 */
function LoginForm(): React.JSX.Element {
  const [name, setName] = useState("secu.cristina@yahoo.com");
  const [username, setUsername] = useState("SolisHills2025!");
  const [validationError, setValidationError] = useState("");

  const navigate = useNavigate();

  async function handleUserLogin(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    if (name === "" && username === "") {
      setValidationError("Empty input fields");
      return;
    } //TO DO: handle input validation

    try {
      const isUserAuthenticated = await authenticateUser({
        email: name,
        password: username,
      });

      console.log("I AM VALIDATED", isUserAuthenticated);

      if (isUserAuthenticated) navigate("/", { replace: true });
    } catch (error) {
      if (typeof error === "string") setValidationError(error);
    }
  }

  return (
    <StyledLoginForm>
      <p>Please type in your credentials below:</p>
      {validationError && <p className="error">{validationError}</p>}
      <form>
        <label htmlFor="name">Name</label>
        <input
          name="name"
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>

        <label htmlFor="userName">Username</label>
        <input
          name="userName"
          id="userName"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        ></input>
        <button onClick={(e) => handleUserLogin(e)}>Log in</button>
      </form>
      <br></br>
      <p>Don't have an account?</p>
      <Link to="/signup">Sign up here</Link>
    </StyledLoginForm>
  );
}

export default LoginForm;
