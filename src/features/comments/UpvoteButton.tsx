interface UpvoteButtonProps {
  upvotes: number;
}
function UpvoteButton({ upvotes }: UpvoteButtonProps): React.JSX.Element {
  function handleUpvote() {
    console.log("Upvoting !!!");
  }
  return (
    <button onClick={handleUpvote}>
      ^ <span>{upvotes}</span>
    </button>
  );
}

export default UpvoteButton;
