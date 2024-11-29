import { NavLink } from "react-router-dom";
import LoginForm from "../features/user/LoginForm";

function HomePage(): React.JSX.Element {
  return (
    <>
      <h1>Welcome to Product Feedback app</h1>
      <LoginForm />
      <NavLink to="/feedbackBoard">Explore Product Feedback App</NavLink>
    </>
  );
}

export default HomePage;
