import styled from "styled-components";
import LoginForm from "../features/user/LoginForm";
import { PageStyles } from "../styles/UIStyles";
const StyledHomePage = styled.div`
  ${PageStyles}
`;
function HomePage(): React.JSX.Element {
  return (
    <StyledHomePage>
      <h1>Welcome to Product Feedback app</h1>
      <LoginForm />
    </StyledHomePage>
  );
}

export default HomePage;
