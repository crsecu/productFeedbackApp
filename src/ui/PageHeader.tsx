import styled from "styled-components";

const StyledPageHeader = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 2;
  align-items: center;
  background-color: pink;
  padding: 12px 20px;
`;

interface PageHeaderProps {
  children: React.ReactNode;
}
function PageHeader({ children }: PageHeaderProps): React.JSX.Element {
  return <StyledPageHeader>{children}</StyledPageHeader>;
}

export default PageHeader;
