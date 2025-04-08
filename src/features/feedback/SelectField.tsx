import { useMemo } from "react";
import { formatCategoryLabel } from "../../utils/helpers";
import { Status } from "../../types/feedback.types";

interface SelectFieldProps {
  name: string;
  id: string;
  isRequired?: boolean;
  initialValue?: string;
  describedById?: string;
  options: readonly Status[];
}

function SelectField({
  id,
  name,
  isRequired = true,
  initialValue,
  describedById,
  options,
}: SelectFieldProps): React.JSX.Element {
  const optionsOutput = useMemo(() => {
    if (!options.length) {
      return <option disabled>No options available</option>;
    }

    return options.map((option) => {
      const optionLabel = formatCategoryLabel(option);
      return (
        <option key={option} value={option}>
          {optionLabel}
        </option>
      );
    });
  }, [options]);

  return (
    <select
      name={name}
      id={id}
      aria-describedby={describedById}
      defaultValue={initialValue}
      required={isRequired}
    >
      {optionsOutput}
    </select>
  );
}

export default SelectField;
