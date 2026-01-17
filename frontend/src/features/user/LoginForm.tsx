import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../types/redux.hooks";
import { setUserCredentials } from "../../store/slices/userSlice";
import { validateUserCredentials } from "../../utils/helpers";
import styled from "styled-components";

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
  const [name, setName] = useState("Cristina");
  const [username, setUsername] = useState("cs");
  const [validationError, setValidationError] = useState("");
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function handleUserLogin(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    if (name === "" && username === "") {
      setValidationError("Empty input fields");
      return;
    } //TO DO: handle input validation

    try {
      const validatedUser = await validateUserCredentials(name, username);
      if (validatedUser) {
        dispatch(setUserCredentials(validatedUser));
        navigate("/feedbackBoard");
        setName("");
        setUsername("");
      }
    } catch (error) {
      if (error instanceof Error) {
        setValidationError(error.message);
      } else {
        setValidationError("Something went wrong. Please try again.");
      }
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
    </StyledLoginForm>
  );
}

export default LoginForm;
