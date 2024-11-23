import { Feedback } from "./feedback.types";
import { calculateTotalComments } from "../../utils/helpers";

interface FeedbackCardProps {
  feedback: Feedback;
  isDetailPage?: boolean;
}

function FeedbackCard({
  feedback,
  isDetailPage = false,
}: FeedbackCardProps): React.JSX.Element {
  if (!feedback)
    return <article className="feedback_card">No matching value found</article>;

  const { title, description, category, upvotes, comments } = feedback;
  const commentCount = calculateTotalComments(comments);

  return (
    <article className="feedback_card">
      {isDetailPage ? <h1>{title}</h1> : <h3>{title}</h3>}
      <p>{description}</p>
      <p>{category}</p>
      <button>
        ^ <span>{upvotes}</span>
      </button>
      <br></br>
      <span>Comment count {commentCount}</span>
    </article>
  );
}

export default FeedbackCard;
