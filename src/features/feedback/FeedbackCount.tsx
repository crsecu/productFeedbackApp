import { useAppSelector } from "../../types/hooks";

function FeedbackCount(): React.JSX.Element {
  const suggestionCount = useAppSelector(
    (state) => state.feedback.feedbackList.length
  );

  return (
    <h2>
      <span>{suggestionCount ?? 0}</span> Suggestions
    </h2>
  );
}

export default FeedbackCount;
