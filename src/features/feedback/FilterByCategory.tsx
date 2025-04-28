import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import { handleOptionChange } from "../../utils/helpers";
import { CATEGORY_OPTIONS } from "../../types/feedback.types";
import styled from "styled-components";
import { Card } from "../../styles/features/FeedbackStyles";
import device from "../../styles/breakpoints";

const StyledFilterByCategory = styled(Card)``;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 22px 8px;
  padding-top: 6px;
  padding-bottom: 14px;

  & li:nth-child(4) {
    margin-right: 6px;
  }
  @media ${device.lg} {
  }
`;

interface FilterByCategoryProps {
  suggestionCount: number;
  onFilterSelect?: () => void;
}
function FilterByCategory({
  suggestionCount,
  onFilterSelect,
}: FilterByCategoryProps): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get("category") || "all";

  const categoryButtons = useMemo(() => {
    return CATEGORY_OPTIONS.map((category, i) => {
      return (
        <CategoryItem
          name="filterByCategory"
          id={category}
          value={category}
          key={`${category + i}`}
          selectedOption={selectedOption}
          isDisabled={suggestionCount === 0}
          onOptionChange={(e) => {
            handleOptionChange(e, setSearchParams, "category", "all");
            onFilterSelect?.();
          }}
        />
      );
    });
  }, [onFilterSelect, selectedOption, setSearchParams, suggestionCount]);

  return (
    <StyledFilterByCategory aria-labelledby="filterByCategory">
      <h2 id="filterByCategory" className="sr-only">
        Filter Suggestions by category
      </h2>
      {/* visually hidden heading */}
      <CategoryList>
        <CategoryItem
          name="filterByCategory"
          id="all"
          value="all"
          key="allCategory"
          selectedOption={selectedOption}
          //isDisabled={suggestionCount === 0}
          onOptionChange={(e) => {
            handleOptionChange(e, setSearchParams, "category", "all");
            onFilterSelect?.();
          }}
        />
        {categoryButtons}
      </CategoryList>
    </StyledFilterByCategory>
  );
}

export default FilterByCategory;
