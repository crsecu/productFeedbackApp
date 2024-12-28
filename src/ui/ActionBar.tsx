import FeedbackCount from "../features/feedback/FeedbackCount";
import { Link } from "react-router-dom";

function ActionBar(): React.JSX.Element {
  return (
    <section className="actionBar">
      <FeedbackCount />
      <span>Sort by</span>
      <Link to={"/createFeedback"}>Add Feedback</Link>
    </section>
  );
}

export default ActionBar;
