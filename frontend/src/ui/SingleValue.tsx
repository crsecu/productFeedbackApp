import { components, GroupBase, SingleValueProps } from "react-select";

function SingleValue(
  props: JSX.IntrinsicAttributes &
    SingleValueProps<unknown, boolean, GroupBase<unknown>>
): React.JSX.Element {
  return (
    <components.SingleValue {...props}>
      <span id="feedbackSortBy">Sort by : </span>
      {props.data.label}
    </components.SingleValue>
  );
}

export default SingleValue;
