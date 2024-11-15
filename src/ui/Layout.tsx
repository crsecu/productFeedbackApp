import { Outlet } from "react-router-dom";
import ActionBar from "./ActionBar";

function Layout(): React.JSX.Element {
  return (
    <>
      <ActionBar />
      <Outlet />
    </>
  );
}

export default Layout;
