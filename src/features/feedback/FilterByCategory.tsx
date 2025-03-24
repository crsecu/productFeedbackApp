import { ChangeEvent, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";
import { handleOptionChange } from "../../utils/helpers";

const feedbackCategories = ["all", "ui", "ux", "enhancement", "bug", "feature"];

interface FilterByCategoryProps {
  suggestionCount: number;
}
function FilterByCategory({
  suggestionCount,
}: FilterByCategoryProps): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedOption = searchParams.get("category") || "all";

  const categoryButtons = useMemo(() => {
    return feedbackCategories.map((category, i) => {
      return (
        <CategoryItem
          name="filterByCategory"
          id={category}
          value={category}
          key={`${category + i}`}
          selectedOption={selectedOption}
          isDisabled={category !== "all" && suggestionCount === 0}
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
      <ul>{categoryButtons}</ul>
    </section>
  );
}

export default FilterByCategory;
