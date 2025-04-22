import styled from "styled-components";

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
`;

interface PageHeaderProps {
  children: React.ReactNode;
}
function PageHeader({ children }: PageHeaderProps): React.JSX.Element {
  return <StyledPageHeader>{children}</StyledPageHeader>;
}

export default PageHeader;
