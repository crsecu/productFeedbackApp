import { ChangeEvent } from "react";
import { useSearchParams } from "react-router-dom";

function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByOption = searchParams.get("sortBy") || "mostUpvotes";

  function handleOptionChange(e: ChangeEvent<HTMLSelectElement>) {
    setSearchParams((prevParams) => {
      return { ...Object.fromEntries(prevParams), sortBy: e.target.value };
    });
  }
  return (
    <div>
      <label htmlFor="sortBy">Sort by:</label>
      <select
        id="sortBy"
        value={sortByOption}
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
