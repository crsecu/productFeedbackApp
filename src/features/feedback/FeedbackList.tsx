import FeedbackTile from "./FeedbackTile";

function FeedbackList(): React.JSX.Element {
  return (
    <section>
      <h2>Feedback List</h2> {/* visually hidden heading */}
      <FeedbackTile />
      <FeedbackTile />
      <FeedbackTile />
    </section>
  );
}

export default FeedbackList;
