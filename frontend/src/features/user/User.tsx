import { ReactNode } from "react";
import styled from "styled-components";

const StyledUser = styled.div`
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  gap: 15px;
`;
interface UserProps {
  children: ReactNode;
}
function User({ children }: UserProps): React.JSX.Element {
  return <StyledUser>{children}</StyledUser>;
}

export default User;
