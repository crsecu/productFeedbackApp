import { useRouteError } from "react-router-dom";
import { errorMessage } from "../utils/helpers";

function FeedbackBoardError(): React.JSX.Element {
  const routeError = useRouteError();

  const error = errorMessage(routeError);

  return (
    <div>
      <h1>Feedback Board Page error</h1>
      <h2 className="error">{error}</h2>
      <br></br>
      <p>
        TO DO: Think what should happen if Feedback Board Page cannot be
        rendered. Does the user gets redirected to Login Page, or a default
        Feedback Board Layout is displayed along with a "Retry" button?
      </p>
    </div>
  );
}

export default FeedbackBoardError;
