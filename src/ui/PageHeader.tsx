import styled from "styled-components";

const StyledPageHeader = styled.header`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background-color: pink;
`;
interface PageHeaderProps {
  children: React.ReactNode;
}
function PageHeader({ children }: PageHeaderProps): React.JSX.Element {
  return <StyledPageHeader>{children}</StyledPageHeader>;
}

export default PageHeader;
