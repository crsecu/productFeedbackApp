import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

function FilterByCategory(): React.JSX.Element {
  const [, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState("all");

  function handleOptionChange(e: ChangeEvent<HTMLInputElement>) {
    const category = e.target.value;
    setCategory(category);

    console.log("label", category);

    setSearchParams({ category });
  }

  return (
    <section>
      <h2>Filter Suggestions by category</h2> {/* visually hidden heading */}
      <div>
        <input
          type="radio"
          name="filterByCategory"
          id="categoryAll"
          value="all"
          checked={category === "all"}
          onChange={(e) => handleOptionChange(e)}
        ></input>
        <label htmlFor="categoryAll">All</label>

        <input
          type="radio"
          name="filterByCategory"
          id="categoryUi"
          value="ui"
          checked={category === "ui"}
          onChange={(e) => handleOptionChange(e)}
        ></input>
        <label htmlFor="categoryUi">UI</label>

        <input
          type="radio"
          name="filterByCategory"
          id="categoryUx"
          value="ux"
          checked={category === "ux"}
          onChange={(e) => handleOptionChange(e)}
        ></input>
        <label htmlFor="categoryUx">UX</label>

        <input
          type="radio"
          name="filterByCategory"
          id="categoryEnhancement"
          value="enhancement"
          checked={category === "enhancement"}
          onChange={(e) => handleOptionChange(e)}
        ></input>
        <label htmlFor="categoryEnhancement">Enhancement</label>

        <input
          type="radio"
          name="filterByCategory"
          id="categoryBug"
          value="bug"
          checked={category === "bug"}
          onChange={(e) => handleOptionChange(e)}
        ></input>
        <label htmlFor="categoryBug">Bug</label>

        <input
          type="radio"
          name="filterByCategory"
          id="categoryFeature"
          value="feature"
          checked={category === "feature"}
          onChange={(e) => handleOptionChange(e)}
        ></input>
        <label htmlFor="categoryFeature">Feature</label>
      </div>
    </section>
  );
}

export default FilterByCategory;
