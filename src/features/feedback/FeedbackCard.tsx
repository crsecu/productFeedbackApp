import { Feedback } from "./feedback.types";
import { calculateTotalComments } from "../../utils/helpers";
import UpvoteButton from "./UpvoteButton";

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
    <>
      <article className="feedback_card">
        {isDetailPage ? (
          <>
            <h1>{title}</h1>
            <UpvoteButton upvotes={upvotes} />
          </>
        ) : (
          <h3>{title}</h3>
        )}

        <p>{description}</p>
        <p>{category}</p>
        <br></br>
        <span>Comment count {commentCount}</span>
      </article>
    </>
  );
}

export default FeedbackCard;
