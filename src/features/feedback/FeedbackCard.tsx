import { Feedback } from "./feedback.types";

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

  /*Calculate the total number of comments and their replies*/
  const baseCount = comments?.length || 0;
  const repliesCount =
    comments?.reduce((totalReplies, comment) => {
      if (comment.replies !== undefined) {
        return totalReplies + comment.replies.length;
      }

      return 0;
    }, 0) || 0;

  const commentCount = baseCount + repliesCount;

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
