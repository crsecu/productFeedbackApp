import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { formatCategoryLabel } from "../../utils/helpers";
const feedbackCategories = ["ui", "ux", "enhancement", "bug", "feature"];

function FilterByCategory(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const filterByOption = searchParams.get("category") || "all";

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    const selectedCategory = e.target.value;

    setSearchParams((prevParams) => {
      return { ...Object.fromEntries(prevParams), category: selectedCategory };
    });
  }

  return (
    <section>
      <h2>Filter Suggestions by category</h2> {/* visually hidden heading */}
      <ul>
        <li key="all">
          <input
            type="radio"
            name="filterByCategory"
            id="categoryAll"
            value="all"
            checked={filterByOption === "all"}
            onChange={(e) => handleOptionChange(e)}
          ></input>
          <label htmlFor="categoryAll">All</label>
        </li>

        {feedbackCategories.map((feedbackCategory) => {
          const categoryLabel = formatCategoryLabel(feedbackCategory);
          return (
            <li key={feedbackCategory}>
              <input
                type="radio"
                name="filterByCategory"
                id="categoryAll"
                value={feedbackCategory}
                checked={filterByOption === feedbackCategory}
                onChange={(e) => handleOptionChange(e)}
              ></input>
              <label htmlFor="categoryAll">{categoryLabel}</label>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default FilterByCategory;
