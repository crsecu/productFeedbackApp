import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { formatCategoryLabel } from "../../utils/helpers";
const feedbackCategories = ["ui", "ux", "enhancement", "bug", "feature"];

function FilterByCategory(): React.JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("all");

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    const category = e.target.value;
    setCategory(category);

    setSearchParams({ category });
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
            checked={category === "all"}
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
                checked={category === feedbackCategory}
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
