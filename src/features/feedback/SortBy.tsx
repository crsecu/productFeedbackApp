import { useSearchParams } from "react-router-dom";
import { handleOptionChange } from "../../utils/helpers";
import styled from "styled-components";
import { sortOptions } from "../../types/customSelect";
import { Option } from "../../types/customSelect";

import SelectInput from "../../ui/SelectInput";
import SingleValue from "../../ui/SingleValue";
import assert from "../../utils/TS_helpers";

const StyledSortyBy = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  & > span {
    color: var(--color-surface-accent);
  }

  & .sortBy__control {
    background-color: var(--color-action-bar);
  }

  & .sortBy__single-value {
    color: var(--color-surface-accent);
    font-weight: var(--font-weight-bold);
  }

  & .sortBy__single-value > span {
    font-weight: normal;
  }

  & .sortBy__menu {
    width: "max-content";
  }

  & .sortBy__option:active {
    background-color: var(--color-text-soft-accent);
  }

  /* & .sortBy__option:last-child {
    border-bottom: none;
  } */

  /* & .sortBy__option--is-selected:after {
    content: "";
    display: inline-block;
    width: 12px;
    aspect-ratio: 13 / 10;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 10' fill='none'%3E%3Cpath d='M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625' stroke='%23AD1FEA' stroke-width='2'/%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
  } */
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
  assert(selectedOption);

  return (
    <StyledSortyBy>
      <SelectInput
        name="SortBy"
        options={sortOptions}
        value={selectedOption}
        aria-labbeledBy="feedbackSortBy"
        onChange={(option) => {
          const opt = option as Option | null;
          if (opt && opt.value !== selectedOption?.value) {
            handleOptionChange(
              setSearchParams,
              "sortBy",
              "mostUpvotes",
              opt.value
            );
          }
        }}
        classNamePrefix="sortBy"
        customComponents={{ SingleValue }}
      />
    </StyledSortyBy>
  );
}

export default SortBy;
