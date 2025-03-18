import { Outlet } from "react-router-dom";

function PageLayout(): React.JSX.Element {
  return (
    <>
      <Outlet />
    </>
  );
}

export default PageLayout;
