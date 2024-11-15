import FeedbackCount from "../features/feedback/FeedbackCount";
function ActionBar(): React.JSX.Element {
  return (
    <section className="actionBar">
      <FeedbackCount />
      <span>Sort by</span>
      <button>Add Feedback</button>
    </section>
  );
}

export default ActionBar;
