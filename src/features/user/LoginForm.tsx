import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../types/hooks";
import { setUserCredentials } from "./userSlice";
import { validateUserCredentials } from "../../utils/helpers";

/* MVP phase of app doesn't support authenticatin
   This component mocks a login process
 */
function LoginForm(): React.JSX.Element {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
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

    const validatedUser = await validateUserCredentials(name, username);
    console.log("validated", validatedUser);

    if (validatedUser) {
      dispatch(setUserCredentials(validatedUser));
      navigate("/feedbackBoard");
      setName("");
      setUsername("");
    } else {
      setValidationError("Incorrect login information.");
    }
  }

  return (
    <div>
      <p>Please type in your credentials below</p>
      {validationError && <p className="loginError">{validationError}</p>}
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
    </div>
  );
}

export default LoginForm;
