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

  const { description, category, status } = feedback;

  return (
    <>
      <article className="feedback_card">
        {/* TO DO: change to h3 for FeedbackBoard */}
        <h1>{feedback.title}</h1>
        {status !== "suggestion" && <p>* {status}</p>}
        <p>{description}</p>
        <p>{category}</p>
        {children}
        <br></br>
      </article>
    </>
  );
}

export default FeedbackCard;
