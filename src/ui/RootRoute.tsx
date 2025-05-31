import { Outlet, useNavigation } from "react-router-dom";
import GlobalModal from "./GlobalModal";
import ToastNotification from "./notifications/ToastNotification";
import GlobalSpinner from "./GlobalSpinner";
import { createPortal } from "react-dom";

function RootRoute(): React.JSX.Element {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const portalRoot = document.getElementById("portal-root");
  const globalModal = portalRoot && createPortal(<GlobalModal />, portalRoot);
  return (
    <>
      {isLoading ? (
        <GlobalSpinner />
      ) : (
        <>
          {/* <GlobalModal /> */}
          {globalModal}
          <ToastNotification />
          <Outlet />
        </>
      )}
    </>
  );
}

export default RootRoute;
