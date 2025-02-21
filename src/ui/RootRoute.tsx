import { Outlet, useNavigation } from "react-router-dom";
import GlobalModal from "./GlobalModal";
import ToastNotification from "./ToastNotification";
import GlobalSpinner from "./GlobalSpinner";

function RootRoute(): React.JSX.Element {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      {isLoading ? (
        <GlobalSpinner />
      ) : (
        <>
          <GlobalModal />
          <ToastNotification />
          <Outlet />
        </>
      )}
    </>
  );
}

export default RootRoute;
