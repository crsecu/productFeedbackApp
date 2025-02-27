import { useSearchParams } from "react-router-dom";
import { SuggestionType } from "../../types/feedback.types";
import { useCallback } from "react";

interface SuggestionCountProps {
  suggestions: SuggestionType[];
}
function SuggestionCount({
  suggestions,
}: SuggestionCountProps): React.JSX.Element {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") || "all";

  const getSuggestionCount = useCallback(() => {
    if (selectedCategory === "all") return suggestions.length;

    const matchingSuggestions = suggestions.filter(
      (suggestions) => suggestions.category === selectedCategory
    );

    return matchingSuggestions.length;
  }, [selectedCategory, suggestions]);

  const suggestionCount = getSuggestionCount();

  return (
    <h2>
      <span>{suggestionCount}</span> Suggestions
    </h2>
  );
}

export default SuggestionCount;
