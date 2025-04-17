import { ReactNode } from "react";
import { SuggestionFeedback } from "../../types/feedback.types";
import { RoadmapFeedback } from "../../types/roadmap.types";

interface FeedbackCardProps {
  children: ReactNode;
  feedback: RoadmapFeedback | SuggestionFeedback;
}

function FeedbackCard({
  children,
  feedback,
}: FeedbackCardProps): React.JSX.Element {
  if (!feedback) return <article>No matching value found</article>;

  const { description, category, status } = feedback;

  return (
    <>
      <article>
        {/* TO DO: change to h1 for FeedbackDetail */}
        <h3>{feedback.title}</h3>
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
