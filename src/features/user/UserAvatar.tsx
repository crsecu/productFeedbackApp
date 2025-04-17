interface UserAvatarProps {
  imageUrl: string;
}
function UserAvatar({ imageUrl }: UserAvatarProps): React.JSX.Element {
  return (
    <div>
      <img src={imageUrl} alt="" />
    </div>
  );
}

export default UserAvatar;
