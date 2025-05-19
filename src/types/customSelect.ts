export interface Option {
  value: string;
  label: string;
}

export const sortOptions: Option[] = [
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
