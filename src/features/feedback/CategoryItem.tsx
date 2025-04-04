import { ChangeEvent } from "react";
import { formatCategoryLabel } from "../../utils/helpers";

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
      <input
        disabled={isDisabled}
        type="radio"
        name={name}
        id={id}
        value={value}
        checked={selectedOption === value}
        onChange={onOptionChange}
      ></input>
      <label htmlFor={id}>{categoryLabel}</label>
    </li>
  );
}

export default CategoryItem;
