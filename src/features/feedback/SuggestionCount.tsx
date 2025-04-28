import { useSearchParams } from "react-router-dom";
import { SuggestionFeedback } from "../../types/feedback.types";
import { useMemo } from "react";
import { H2 } from "../../styles/Typography";
import styled from "styled-components";
import device from "../../styles/breakpoints";

const StyledSuggestionCount = styled(H2)`
  display: none;

  @media ${device.sm} {
    display: block;
  }
`;

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
    <StyledSuggestionCount>
      <span>{suggestionCount}</span> Suggestions
    </StyledSuggestionCount>
  );
}

export default SuggestionCount;
