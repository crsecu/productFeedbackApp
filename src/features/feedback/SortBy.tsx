import { useSearchParams } from "react-router-dom";
import { handleOptionChange } from "../../utils/helpers";
import styled from "styled-components";
import Select from "react-select";
import { sortOptions } from "../../types/customSelect";
import { Option } from "../../types/customSelect";

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

function getOptionFromValue(
  selectedOption: string,
  options: Option[]
): Option | undefined {
  const result = options.find((option) => {
    return option.value === selectedOption;
  });

  return result;
}

function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get("sortBy") || "mostUpvotes";
  console.log("sort option", getOptionFromValue(sortByValue, sortOptions));

  const selectedOption = getOptionFromValue(sortByValue, sortOptions);

  return (
    <StyledSortBy>
      <Select
        options={sortOptions}
        value={selectedOption}
        onChange={(option) => {
          if (option && "value" in option) {
            if (option.value === selectedOption?.value) {
              return;
            }

            handleOptionChange(
              setSearchParams,
              "sortBy",
              "mostUpvotes",
              option.value
            );
          }
        }}
      />
    </StyledSortBy>
  );
}

export default SortBy;
