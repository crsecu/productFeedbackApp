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
  const userImage = imageUrl || "/assets/user-images/avatar.png";

  return (
    <StyledUserAvatar>
      <img src={userImage} alt="" />
    </StyledUserAvatar>
  );
}

export default UserAvatar;
