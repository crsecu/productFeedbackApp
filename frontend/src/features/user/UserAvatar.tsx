import styled from "styled-components";

const StyledUserAvatar = styled.div`
  display: inline-block;

  & img {
    height: 40px;
    border-radius: 50%;
  }
`;

interface UserAvatarProps {
  imageUrl?: string;
}
function UserAvatar({ imageUrl }: UserAvatarProps): React.JSX.Element {
  return (
    <StyledUserAvatar>
      <img src={imageUrl} alt="" />
    </StyledUserAvatar>
  );
}

export default UserAvatar;
