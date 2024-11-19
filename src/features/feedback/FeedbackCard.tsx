import { Feedback } from "./feedback.types";
import { Link } from "react-router-dom";
interface FeedbackCardProps {
  feedback: Feedback;
}
function FeedbackCard({ feedback }: FeedbackCardProps): React.JSX.Element {
  const { title, description, category, upvotes, id } = feedback;
  console.log("here", feedback);
  return (
    <li>
      <Link to="/feedbackDetail/123">
        <article className="feedback_card">
          {/* TO DO: display title as an <h1> if feedback card is rendered on Feedback Detail Page */}
          {/*detailPage ? <h1>Title</h1> : <h3>Title</h3> */}
          <h3>{title}</h3>
          <p>{description}</p>
          <p>{category}</p>
          <button>
            ^ <span>{upvotes}</span>
          </button>

          <span>Comment Count 2</span>
        </article>
      </Link>
    </li>
  );
}

export default FeedbackCard;
