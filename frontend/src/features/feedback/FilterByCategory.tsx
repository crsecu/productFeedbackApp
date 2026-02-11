import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryItem from "../../ui/form/CategoryItem";
import { handleOptionChange } from "../../utils/helpers";
import { CATEGORY_OPTIONS } from "../../types/feedback.types";
import styled from "styled-components";

import device from "../../styles/breakpoints";
import { panelStyles } from "../../styles/UIStyles";

const StyledFilterByCategory = styled.section`
  ${panelStyles}
  //padding: 26px;

  @media ${device.sm} {
    //padding-right: 0;
  }
`;

const CategoryList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 22px 8px;
  /* padding-top: 6px;
  padding-bottom: 14px; */

  max-width: 200px;

  & li:nth-child(4) {
    margin-right: 6px;
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
            handleOptionChange(
              setSearchParams,
              "category",
              "all",
              e.target.value
            );
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
            handleOptionChange(
              setSearchParams,
              "category",
              "all",
              e.target.value
            );
            onFilterSelect?.();
          }}
        />
        {categoryButtons}
      </CategoryList>
    </StyledFilterByCategory>
  );
}

export default FilterByCategory;
