import { components, DropdownIndicatorProps, GroupBase } from "react-select";

function DropdownIndicator<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
>(props: DropdownIndicatorProps<Option, IsMulti, Group>) {
  return (
    <components.DropdownIndicator {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="7"
        viewBox="0 0 10 7"
        fill="none"
      >
        <path id="Path 2" d="M1 1L5 5L9 1" stroke="white" strokeWidth="2" />
      </svg>
    </components.DropdownIndicator>
  );
}

export default DropdownIndicator;
