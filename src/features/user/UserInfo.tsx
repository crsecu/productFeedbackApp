interface UserInfo {
  name: string;
  username: string;
}
function UserInfo({ name, username }: UserInfo): React.JSX.Element {
  return (
    <div className="comment__authorInfo">
      <p>
        <strong>{name}</strong>
      </p>
      <span>@{username}</span>
    </div>
  );
}

export default UserInfo;
