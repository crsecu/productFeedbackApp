import { ChangeEvent, useState } from "react";
import { useSearchParams } from "react-router-dom";

function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const [option, setOption] = useState(
    searchParams.get("sortBy") || "mostUpvotes"
  );

  function handleOptionChange(e: ChangeEvent<HTMLSelectElement>) {
    setOption(e.target.value);
    setSearchParams((prevParams) => {
      return { ...Object.fromEntries(prevParams), sortBy: e.target.value };
    });
  }
  return (
    <div>
      <label htmlFor="sortBy">Sort by:</label>
      <select
        id="sortBy"
        value={option}
        onChange={(e) => handleOptionChange(e)}
      >
        <option value="mostUpvotes">Most Upvotes</option>
        <option value="leastUpvotes">Least Upvotes</option>
        <option value="mostComments">Most Comments</option>
        <option value="leastComments">Least Comments</option>
      </select>
    </div>
  );
}

export default SortBy;
