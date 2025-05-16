import { ChangeEvent } from "react";
import { formatCategoryLabel } from "../../utils/helpers";
import styled from "styled-components";
import { CategoryLabel } from "../../styles/features/FeedbackStyles";

const RadioInput = styled.input`
  position: fixed;
  width: 0;

  &:hover + label {
    background-color: var(--color-surface-accent-hover);
  }

  &:checked + label {
    color: var(--color-text-light);
    background-color: var(--color-accent);
  }

  &:focus-visible + label {
    outline: 2px solid var(--color-primary);
    outline-offset: 3px;
  }
`;

interface CategoryItemProps {
  name: string;
  id: string;
  value: string;
  isDisabled?: boolean;
  selectedOption: string;

  // eslint-disable-next-line no-unused-vars
  onOptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function CategoryItem({
  name,
  id,
  value,
  isDisabled,
  selectedOption,
  onOptionChange,
}: CategoryItemProps): React.JSX.Element {
  const categoryLabel = formatCategoryLabel(value);

  return (
    <li>
      <RadioInput
        disabled={isDisabled}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={selectedOption === value}
        onChange={onOptionChange}
      ></RadioInput>
      <CategoryLabel htmlFor={id}>{categoryLabel}</CategoryLabel>
    </li>
  );
}

export default CategoryItem;
