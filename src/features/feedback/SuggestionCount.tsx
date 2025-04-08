import { useSearchParams } from "react-router-dom";
import { SuggestionFeedback } from "../../types/feedback.types";
import { useMemo } from "react";

interface SuggestionCountProps {
  suggestions: SuggestionFeedback[];
}
function SuggestionCount({
  suggestions,
}: SuggestionCountProps): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const suggestionCount = useMemo(() => {
    if (selectedCategory === "all") return suggestions.length;

    const matchingSuggestions = suggestions.filter(
      (suggestions) => suggestions.category === selectedCategory
    );

    return matchingSuggestions.length;
  }, [selectedCategory, suggestions]);

  return (
    <h2>
      <span>{suggestionCount}</span> Suggestions
    </h2>
  );
}

export default SuggestionCount;
