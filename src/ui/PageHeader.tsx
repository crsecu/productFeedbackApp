import styled from "styled-components";
import device from "../styles/breakpoints";

const StyledPageHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  align-items: center;
  padding: 12px 20px;
  background: radial-gradient(
    circle at 100%,
    #e84d70 0%,
    #a337f6 53%,
    #28a7ed 115%
  );

  @media ${device.sm} {
    border-radius: var(--border-radius-sm);
    align-items: end;
    padding-bottom: 22px;

    & button {
      display: none;
    }
  }

  @media ${device.md} {
    flex-basis: 225px;
  }

  @media ${device.lg} {
    flex-basis: 137px;
  }
`;

interface PageHeaderProps {
  children: React.ReactNode;
}
function PageHeader({ children }: PageHeaderProps): React.JSX.Element {
  return <StyledPageHeader>{children}</StyledPageHeader>;
}

export default PageHeader;
