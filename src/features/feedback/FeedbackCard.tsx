import { Feedback } from "./feedback.types";

interface FeedbackCardProps {
  feedback: Feedback;
}
function FeedbackCard({ feedback }: FeedbackCardProps): React.JSX.Element {
  if (!feedback)
    return <article className="feedback_card">No matching value found</article>;

  const { title, description, category, upvotes } = feedback;

  return (
    <li>
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
    </li>
  );
}

export default FeedbackCard;
