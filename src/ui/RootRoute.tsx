import { Outlet } from "react-router-dom";
import GlobalModal from "./GlobalModal";
import ToastNotification from "./ToastNotification";

function RootRoute(): React.JSX.Element {
  return (
    <>
      <GlobalModal />
      <ToastNotification />
      <Outlet />
    </>
  );
}

export default RootRoute;
