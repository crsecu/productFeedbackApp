import { useSearchParams } from "react-router-dom";
import { handleOptionChange } from "../../utils/helpers";
import styled from "styled-components";

const SelectSortBy = styled.select`
  background-color: var(--color-action-bar);
  color: var(--color-text-light);
  border: none;
  font-weight: var(--font-weight-bold);
`;

function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByOption = searchParams.get("sortBy") || "mostUpvotes";
  console.log("sort option", sortByOption);

  return (
    <div>
      <label htmlFor="sortBy">Sort by :</label>
      <SelectSortBy
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
      </SelectSortBy>
    </div>
  );
}

export default SortBy;
