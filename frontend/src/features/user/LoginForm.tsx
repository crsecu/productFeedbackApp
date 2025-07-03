import { MouseEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { authenticateUser, authorizeUser } from "../../services/apiAuth";
import { setUserCredentials } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../types/redux.hooks";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationError, setValidationError] = useState("");

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  async function handleUserLogin(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) {
    e.preventDefault();

    if (email === "" && password === "") {
      setValidationError("Empty input fields");
      return;
    } //TO DO: handle input validation

    try {
      const isUserAuthenticated = await authenticateUser({
        email,
        password,
      });

      console.log("I AM VALIDATED", isUserAuthenticated);

      if (isUserAuthenticated) {
        const loggedInUser = await authorizeUser(
          isUserAuthenticated.accessToken
        );
        console.log("log", loggedInUser);
        const { id, email, user_metadata: userMeta } = loggedInUser;

        //save user in Redux - TEST
        dispatch(
          setUserCredentials({
            id,
            email,
            name: userMeta.name,
            username: email,
          })
        );

        navigate("/");
      }
    } catch (error) {
      if (typeof error === "string") setValidationError(error);
    }
  }

  return (
    <StyledLoginForm>
      <p>Please type in your credentials below:</p>
      {validationError && <p className="error">{validationError}</p>}
      <form>
        <label htmlFor="name">Email</label>
        <input
          name="email"
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <label htmlFor="password">Password</label>
        <input
          name="password"
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button onClick={(e) => handleUserLogin(e)}>Log in</button>
      </form>
    </StyledLoginForm>
  );
}

export default LoginForm;
