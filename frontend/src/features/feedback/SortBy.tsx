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
    border-radius: 10px;
  }

  & .sortBy__control--is-focused {
    outline: 1px solid #2cbeb2;
    outline-offset: 4px;
    box-shadow: inset 0 0 2px 1px #00524b, 0 0 12px 1px #5fbab0;
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
