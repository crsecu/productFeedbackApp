import { FeedbackType } from "../../types/feedback.types";
import FeedbackItem from "./FeedbackItem";

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
      <FeedbackItem feedbackItem={feedback} isDetailPage={true} />
      {children}
    </main>
  );
}

export default FeedbackDetailContent;
