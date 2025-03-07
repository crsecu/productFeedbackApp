import { FeedbackType } from "../../types/feedback.types";
import FeedbackCard from "./FeedbackCard";
import FeedbackItem from "./FeedbackItem";
import UpvoteButton from "./UpvoteButton";

interface FeedbackDetailContentProps {
  children: React.ReactNode;
  feedback: FeedbackType;
}

function FeedbackDetailContent({
  children,
  feedback,
}: FeedbackDetailContentProps): React.JSX.Element {
  return (
    <main style={{ paddingTop: "26px" }}>
      <FeedbackItem>
        <UpvoteButton
          feedbackId={feedback.id}
          initialUpvoteCount={feedback.upvotes}
        />
        <FeedbackCard feedback={feedback}>
          <h1>{feedback.title}</h1>
        </FeedbackCard>
      </FeedbackItem>
      {children}
    </main>
  );
}

export default FeedbackDetailContent;
