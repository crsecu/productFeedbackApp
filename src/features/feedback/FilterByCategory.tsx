import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import CategoryItem from "./CategoryItem";

const feedbackCategories = ["all", "ui", "ux", "enhancement", "bug", "feature"];

function FilterByCategory(): React.JSX.Element {
  const [, setSearchParams] = useSearchParams();

  //TO DO: Assess if memoizing handleOptionChange is worth the cost given its low complexity
  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedCategory = e.target.value;

    setSearchParams((prevParams) => {
      return { ...Object.fromEntries(prevParams), category: selectedCategory };
    });
  }

  const categoryButtons = feedbackCategories.map((category, i) => {
    return (
      <CategoryItem
        name="filterByCategory"
        id={category}
        value={category}
        key={`${category + i}`}
        onOptionChange={handleOptionChange}
      />
    );
  });

  return (
    <section>
      <h2>Filter Suggestions by category</h2> {/* visually hidden heading */}
      <ul>{categoryButtons}</ul>
    </section>
  );
}

export default FilterByCategory;
