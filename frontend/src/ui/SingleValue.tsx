import { components, GroupBase, SingleValueProps } from "react-select";
import { Option } from "../types/customSelect";

function SingleValue(
  props: JSX.IntrinsicAttributes &
    SingleValueProps<Option, boolean, GroupBase<Option>>
): React.JSX.Element {
  return (
    <components.SingleValue {...props}>
      <span id="feedbackSortBy">Sort by : </span>
      {props.data.label}
    </components.SingleValue>
  );
}

export default SingleValue;
