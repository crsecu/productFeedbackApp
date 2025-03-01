import { ReactNode } from "react";
import {
  RoadmapFeedbackType,
  SuggestionType,
} from "../../types/feedback.types";

interface FeedbackCardProps {
  children: ReactNode;
  feedback: RoadmapFeedbackType | SuggestionType;
}

function FeedbackCard({
  children,
  feedback,
}: FeedbackCardProps): React.JSX.Element {
  if (!feedback)
    return <article className="feedback_card">No matching value found</article>;

  const { description, category, commentCount, status } = feedback;

  return (
    <>
      <article className="feedback_card">
        {status !== "suggestion" && <p>* {status}</p>}
        {children}
        <p>{description}</p>
        <p>{category}</p>
        <br></br>
        <span>Comment count {commentCount ? commentCount : 0}</span>
      </article>
    </>
  );
}

export default FeedbackCard;
