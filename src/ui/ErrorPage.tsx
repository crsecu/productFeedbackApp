import { useRouteError } from "react-router-dom";
//TO DO: Look into TS type narrowing and define the potential types of the error object. This will prevent runtime errors when accessing a property that doesn’t exist.

function ErrorPage(): React.JSX.Element {
  const error = useRouteError();

  return (
    <div>
      <h2 style={{ color: "darkRed" }}>Oops! You've encountered an error</h2>
      <p>{error.data || error.message}</p>
    </div>
  );
}

export default ErrorPage;
