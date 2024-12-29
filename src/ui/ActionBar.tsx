import FeedbackCount from "../features/feedback/FeedbackCount";
import SortBy from "../features/feedback/SortBy";
import { Link } from "react-router-dom";

function ActionBar(): React.JSX.Element {
  return (
    <section className="actionBar">
      <FeedbackCount />
      <SortBy />
      <Link to={"/createFeedback"}>Add Feedback</Link>
    </section>
  );
}

export default ActionBar;
