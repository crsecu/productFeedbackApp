import { useSearchParams } from "react-router-dom";
import { useAppSelector } from "../../types/hooks";
import { getCountOfFeedbackEntriesByCategory } from "./feedbackSlice";

function FeedbackCount(): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";
  console.log("here", selectedCategory);
  const suggestionCount = useAppSelector((state) =>
    getCountOfFeedbackEntriesByCategory(selectedCategory)(state)
  );

  return (
    <h2>
      <span>{suggestionCount}</span> Suggestions
    </h2>
  );
}

export default FeedbackCount;
