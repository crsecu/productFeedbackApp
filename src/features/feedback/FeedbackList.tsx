import FeedbackCard from "./FeedbackCard";

function FeedbackList(): React.JSX.Element {
  return (
    <section className="feedback_list">
      <h2>Feedback List</h2> {/* visually hidden heading */}
      <ul>
        <FeedbackCard />
        <FeedbackCard />
        <FeedbackCard />
      </ul>
    </section>
  );
}

export default FeedbackList;
