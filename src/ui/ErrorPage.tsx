import { useRouteError } from "react-router-dom";
//TO DO: Look into TS type narrowing and define the potential types of the error object. This will prevent runtime errors when accessing a property that doesn’t exist.

function ErrorPage(): React.JSX.Element {
  const error = useRouteError();

  console.log(error);
  return <div>Oops! {error.data}</div>;
}

export default ErrorPage;
