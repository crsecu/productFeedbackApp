import { ChangeEvent } from "react";
import { formatCategoryLabel } from "../../utils/helpers";
import styled from "styled-components";

const Input = styled.input`
  &[type="radio"] {
    //opacity: 0;
    position: fixed;
    width: 0;

    &:checked + label {
      color: var(--color-text-light);
      background-color: var(--color-accent);
    }

    &:focus + label {
      border: 2px solid var(--color-primary);
    }
  }
`;

const Label = styled.label`
  background-color: var(--color-surface-accent);
  color: var(--color-text-accent);
  font-size: var(--font-size-body-3);
  font-weight: var(--font-weight-bold);
  padding: 5px 16px;
  border-radius: 10px;
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
      <Input
        disabled={isDisabled}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={selectedOption === value}
        onChange={onOptionChange}
      ></Input>
      <Label htmlFor={id}>{categoryLabel}</Label>
    </li>
  );
}

export default CategoryItem;
