import { NavLink } from "react-router-dom";

function Home(): React.JSX.Element {
  return (
    <>
      <h1>Homepage</h1>
      <NavLink to="/feedbackBoard">Explore Product Feedback App</NavLink>
    </>
  );
}

export default Home;
