import { useSearchParams } from "react-router-dom";
import { handleOptionChange } from "../../utils/helpers";
import styled from "styled-components";

const StyledSortBy = styled.div`
  margin-right: auto;
`;

const SelectSortBy = styled.select`
  margin-right: auto;
  background-color: var(--color-action-bar);
  color: var(--color-text-light);
  border: none;
  font-weight: var(--font-weight-bold);
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("assets/chevron-down.svg");
  background-repeat: no-repeat, repeat;
  /* background-size: 10px 6px; */
  background-position: right;
  background-position: right 3px bottom 5px;
  width: 120px;
  padding-left: 6px;

  & option {
    background-color: #ffffff;
    color: #647196;
    font-size: 1rem;
    border-bottom: 1px solid red;
  }
`;

function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByOption = searchParams.get("sortBy") || "mostUpvotes";
  console.log("sort option", sortByOption);

  return (
    <StyledSortBy>
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
    </StyledSortBy>
  );
}

export default SortBy;
