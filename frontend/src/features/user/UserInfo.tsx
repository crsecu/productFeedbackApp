import styled from "styled-components";

const StyledUserInfo = styled.div`
  display: inline-block;
`;

interface UserInfo {
  name: string;
  username: string;
}
function UserInfo({ name, username }: UserInfo): React.JSX.Element {
  return (
    <StyledUserInfo>
      <p>
        <strong>{name}</strong>
      </p>
      <span>@{username}</span>
    </StyledUserInfo>
  );
}

export default UserInfo;
