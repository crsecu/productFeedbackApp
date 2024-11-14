import { Outlet } from "react-router-dom";
import ActionHeader from "./ActionHeader";

function Layout(): React.JSX.Element {
  return (
    <>
      <ActionHeader />
      <Outlet />
    </>
  );
}

export default Layout;
