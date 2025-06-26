import { useNavigation } from "react-router-dom";
import GlobalModal from "./modal/GlobalModal";
import ToastNotification from "./notifications/ToastNotification";
import GlobalSpinner from "./GlobalSpinner";
import { createPortal } from "react-dom";
import { ReactNode } from "react";
interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
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
          {globalModal}
          <ToastNotification />
          {children}
        </>
      )}
    </>
  );
}

export default AppLayout;
