import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { getCountOfFeedbackByStatusAndCategory } from "../../store/slices/feedbackSlice";

function FeedbackCount(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const suggestionCount = useAppSelector((state) =>
    getCountOfFeedbackByStatusAndCategory("suggestion", selectedCategory)(state)
  );

  return (
    <h2>
      <span>{suggestionCount}</span> Suggestions
    </h2>
  );
}

export default FeedbackCount;
