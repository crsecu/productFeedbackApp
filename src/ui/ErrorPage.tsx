import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import { CancelButton, panelStyles } from "../styles/UIStyles";
import { H1 } from "../styles/Typography";
import { errorMessage } from "../utils/helpers";
import errorIcon from "../assets/images/icon-error-page.svg";
import device from "../styles/breakpoints";
//TO DO: Look into TS type narrowing and define the potential types of the error object. This will prevent runtime errors when accessing a property that doesn’t exist.

const StyledErrorPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100dvh;

  & div {
    ${panelStyles}

    max-width: fit-content;
    text-align: center;
    max-width: 75%;
  }

  & img {
    height: 150px;
    margin: 0 auto;
  }

  & p {
    margin-bottom: 20px;
  }

  @media ${device.sm} {
    & div {
      max-width: 60%;
    }
  }

  @media ${device.lg} {
    & div {
      width: 50%;
    }
  }
`;
function ErrorPage(): React.JSX.Element {
  const routeError = useRouteError();
  const navigate = useNavigate();
  const error = errorMessage(routeError);

  return (
    <StyledErrorPage>
      <div>
        <img src={errorIcon} />
        <H1>Oops! You've encountered an error</H1>
        <p>{error}</p>
        <CancelButton onClick={() => navigate(-1)}>Go Back</CancelButton>
      </div>
    </StyledErrorPage>
  );
}

export default ErrorPage;
