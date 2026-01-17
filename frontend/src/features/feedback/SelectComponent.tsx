import Select from "react-select";
interface Option {
  value: string;
  label: string;
}

interface SelectComponent {
  options: Option[];
}

const options: Option[] = [
  {
    value: "mostUpvotes",
    label: "Most Upvotes",
  },
  {
    value: "leastUpvotes",
    label: "Least Upvotes",
  },
  {
    value: "mostComments",
    label: "Most Comments",
  },
  {
    value: "leastComments",
    label: "Least Comments",
  },
];

function SelectComponent(): React.JSX.Element {
  return <Select options={options} />;
}

export default SelectComponent;
