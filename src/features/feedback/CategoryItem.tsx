import { ChangeEvent } from "react";
import { formatCategoryLabel } from "../../utils/helpers";

interface CategoryItemProps {
  name: string;
  id: string;
  value: string;
  isDisabled: boolean;
  // eslint-disable-next-line no-unused-vars
  onOptionChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
function CategoryItem({
  name,
  id,
  value,
  isDisabled,
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
        defaultChecked={value === "all"}
        onChange={(e) => onOptionChange(e)}
      ></input>
      <label htmlFor={id}>{categoryLabel}</label>
    </li>
  );
}

export default CategoryItem;
