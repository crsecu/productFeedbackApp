function Comment(): React.JSX.Element {
  return (
    <li>
      <div>
        {/* avatar image goes here */}
        <p>
          <strong>John Doe</strong>
          <span>john_doe123</span>
        </p>
      </div>
      <p>
        Please start working on it asap. Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Qui quidem non dolores reprehenderit odio tempore.
      </p>
      <button>Reply</button>
    </li>
  );
}

export default Comment;
