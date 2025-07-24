import { useNavigation } from "react-router-dom";
import GlobalModal from "./modal/GlobalModal";
import ToastNotification from "./notifications/ToastNotification";
import GlobalSpinner from "./GlobalSpinner";
import { createPortal } from "react-dom";
import { ReactNode } from "react";
import styled from "styled-components";
import device from "../styles/breakpoints";

const AppLayoutWrapper = styled.div`
  height: inherit;
  & > span {
    display: block;
    height: 16px;
  }

  & > div:not(.userProfileHeader) {
    @media ${device.sm} {
      width: 92vw;
      margin: 0 auto;
    }

    @media ${device.xl} {
      width: 88vw;
    }

    @media ${device.xxl} {
      width: 70vw;
    }
  }
`;

interface AppLayoutProps {
  children: ReactNode;
}

function AppLayout({ children }: AppLayoutProps): React.JSX.Element {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const portalRoot = document.getElementById("portal-root");
  const globalModal = portalRoot && createPortal(<GlobalModal />, portalRoot);
  return (
    <AppLayoutWrapper className="AppLayout">
      {isLoading ? (
        <GlobalSpinner />
      ) : (
        <>
          {globalModal}
          <ToastNotification />
          {children}
        </>
      )}
      <span></span>
    </AppLayoutWrapper>
  );
}

export default AppLayout;
