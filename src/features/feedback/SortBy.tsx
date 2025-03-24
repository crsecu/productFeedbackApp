import { useSearchParams } from "react-router-dom";
import { handleOptionChange } from "../../utils/helpers";
/* TO DO: It may be beneficial to create a custom hook for handling the option change
as it's also used inside FilterByCategory component; 
*/
function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByOption = searchParams.get("sortBy") || "mostUpvotes";
  console.log("sort option", sortByOption);

  return (
    <div>
      <label htmlFor="sortBy">Sort by:</label>
      <select
        id="sortBy"
        value={sortByOption}
        onChange={(e) =>
          handleOptionChange(e, setSearchParams, "sortBy", "mostUpvotes")
        }
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
