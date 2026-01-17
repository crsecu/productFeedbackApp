import Select, {
  Props,
  StylesConfig,
  SelectComponentsConfig,
} from "react-select";

import { GroupBase } from "react-select";
import DropdownIndicator from "./DropdownIndicator";

interface SelectInputProps<
  Option,
  IsMulti extends boolean,
  Group extends GroupBase<Option>
> {
  name: string;
  customComponents?: SelectComponentsConfig<Option, IsMulti, Group>;
}

function SelectInput<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  customComponents,
  ...props
}: Props<Option, IsMulti, Group> & SelectInputProps<Option, IsMulti, Group>) {
  const customSelectStyles: StylesConfig<Option, IsMulti, Group> = {
    control: (baseStyles, state) => ({
      ...baseStyles,

      backgroundColor: "var(--color-background)",

      border: "none",
      boxShadow: "none",
      outline: state.isFocused ? "1px solid #2cbeb2" : undefined,
      padding: "0 4px",
      cursor: "pointer",
      gap: "5px",

      "&:hover .sortBy__single-value": {
        color: "#CDD2EE",
      },
    }),

    valueContainer: (baseStyles) => ({
      ...baseStyles,
      paddingRight: 0,
      paddingLeft: 0,
      flex: "none",
    }),
    singleValue: (baseStyles) => ({
      ...baseStyles,
      color: "var(--color-tertiary)",
    }),

    indicatorSeparator: () => ({ display: "none" }),

    menu: (baseStyles) => ({
      ...baseStyles,

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
      display: state.isSelected ? "flex" : undefined,
      justifyContent: state.isSelected ? "space-between" : undefined,
      alignItems: state.isSelected ? "center" : undefined,
      backgroundColor: state.isSelected ? "var(--color-surface)" : undefined,
      color: state.isFocused
        ? "var(--color-primary)"
        : "var(--color-text-dark)",
      cursor: "pointer",
      padding: "10px 16px",
      gap: "20px",

      "&:last-child": {
        borderBottom: "none",
      },

      "&:after": state.isSelected
        ? {
            content: "''",
            display: "inline-block",
            width: "12px",
            aspectRatio: "13 / 10",
            backgroundImage: `url(
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 13 10' fill='none'%3E%3Cpath d='M0.968262 4.85894L4.49995 8.39062L11.9999 0.890625' stroke='%23AD1FEA' stroke-width='2'/%3E%3C/svg%3E"
            )`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }
        : undefined,
    }),

    indicatorsContainer: (baseStyles) => ({
      ...baseStyles,
      flex: 1,
    }),
    dropdownIndicator: (baseStyles, state) => ({
      ...baseStyles,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : undefined,
      padding: "2px 0 0 0",
      paddingBottom: state.selectProps.menuIsOpen ? "3px" : undefined,
    }),
  };

  return (
    <Select<Option, IsMulti, Group>
      name={name}
      {...props}
      components={{ DropdownIndicator, ...customComponents }}
      styles={customSelectStyles}
    />
  );
}

export default SelectInput;
