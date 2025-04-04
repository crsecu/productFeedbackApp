import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import { handleOptionChange } from "../../utils/helpers";
import { CATEGORY_OPTIONS } from "../../types/feedback.types";

//const feedbackCategories = ["all", "ui", "ux", "enhancement", "bug", "feature"];

interface FilterByCategoryProps {
  suggestionCount: number;
}
function FilterByCategory({
  suggestionCount,
}: FilterByCategoryProps): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get("category") || "all";

  const categoryButtons = useMemo(() => {
    return CATEGORY_OPTIONS.map((category, i) => {
      console.log("boom", typeof category);
      return (
        <CategoryItem
          name="filterByCategory"
          id={category}
          value={category}
          key={`${category + i}`}
          selectedOption={selectedOption}
          isDisabled={suggestionCount === 0}
          onOptionChange={(e) =>
            handleOptionChange(e, setSearchParams, "category", "all")
          }
        />
      );
    });
  }, [selectedOption, setSearchParams, suggestionCount]);

  return (
    <section>
      <h2>Filter Suggestions by category</h2> {/* visually hidden heading */}
      <ul>
        <CategoryItem
          name="filterByCategory"
          id="all"
          value="all"
          key="allCategory"
          selectedOption={selectedOption}
          //isDisabled={suggestionCount === 0}
          onOptionChange={(e) =>
            handleOptionChange(e, setSearchParams, "category", "all")
          }
        />
        {categoryButtons}
      </ul>
    </section>
  );
}

export default FilterByCategory;
