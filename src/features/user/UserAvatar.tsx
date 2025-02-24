interface UserAvatarProps {
  imageUrl: string;
}
function UserAvatar({ imageUrl }: UserAvatarProps): React.JSX.Element {
  return (
    <div>
      <img src={imageUrl} alt="" style={{ borderRadius: "50%" }} />
    </div>
  );
}

export default UserAvatar;
