import { useSearchParams } from "react-router-dom";
import { handleOptionChange } from "../../utils/helpers";
import styled from "styled-components";
import Select from "react-select";
import { sortOptions } from "../../types/customSelect";
import { Option } from "../../types/customSelect";
import DropdownIndicator from "../../ui/DropdownIndicator";
import SingleValue from "../../ui/SingleValue";

const StyledSortyBy = styled.div`
  display: flex;
  align-items: center;
  flex: 1;

  & > span {
    color: var(--color-surface-accent);
  }

  & .sortBy__option:active {
    background-color: var(--color-text-soft-accent);
  }

  & .sortBy__option:last-child {
    border-bottom: none;
  }

  & .sortBy__option--is-selected:after {
    content: "";
    display: inline-block;
    width: 12px;
    aspect-ratio: 13 / 10;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 10' fill='none'%3E%3Cpath d='M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625' stroke='%23AD1FEA' stroke-width='2' /%3E%3C/svg%3E");
    background-size: contain;
    background-repeat: no-repeat;
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

const customStyles = {
  control: (baseStyles, state) => ({
    ...baseStyles,

    backgroundColor: "var(--color-action-bar)",
    border: "none",
    outline: state.isFocused && "2px solid var(--color-primary-hover)",
    padding: "0 4px",
    cursor: "pointer",
    gap: "5px",

    "&:hover .sortBy__single-value": {
      color: "#CDD2EE",
    },
  }),

  valueContainer: (baseStyles, state) => ({
    ...baseStyles,
    paddingRight: 0,
    paddingLeft: 0,
    flex: "none",
  }),
  singleValue: (baseStyles, state) => ({
    ...baseStyles,
    color: "var(--color-surface-accent)",
    fontWeight: "var(--font-weight-bold)",
  }),

  indicatorSeparator: () => null,
  menu: (baseStyles, state) => ({
    ...baseStyles,
    width: "max-content",

    backgroundColor: "var(--color-surface)",
    color: "var(--color-text-dark)",
    marginTop: "14px",
    borderRadius: "var(--border-radius-sm)",
    boxShadow:
      "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 32px",

    "& .sortBy__menu-list": {
      padding: 0,
      borderRadius: "var(--border-radius-sm)",
    },
  }),
  option: (baseStyles, state) => ({
    ...baseStyles,
    borderBottom: "1px solid rgba(151, 151, 151, 0.20)",
    display: state.isSelected && "flex",
    justifyContent: state.isSelected && "space-between",
    alignItems: state.isSelected && "center",
    backgroundColor: state.isSelected && "var(--color-surface)",
    color: state.isFocused ? "var(--color-primary)" : "var(--color-text-dark)",
    cursor: "pointer",
    padding: "10px 16px",
    gap: "20px",
  }),
  indicatorsContainer: (baseStyles) => ({
    ...baseStyles,
    flex: 1,
  }),
  dropdownIndicator: (baseStyles, state) => ({
    ...baseStyles,
    transform: state.selectProps.menuIsOpen && "rotate(180deg)",
    padding: "2px 0 0 0",
    paddingBottom: state.selectProps.menuIsOpen && "3px",
  }),
};

function SortBy(): React.JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortByValue = searchParams.get("sortBy") || "mostUpvotes";
  console.log("sort option", getOptionFromValue(sortByValue, sortOptions));

  const selectedOption = getOptionFromValue(sortByValue, sortOptions);

  return (
    <StyledSortyBy>
      <Select
        options={sortOptions}
        value={selectedOption}
        aria-labelledby="feedbackSortBy"
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
        styles={customStyles}
        classNamePrefix="sortBy"
        components={{ DropdownIndicator, SingleValue }}
      />
    </StyledSortyBy>
  );
}

export default SortBy;
