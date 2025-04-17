import { formatCategoryLabel } from "../../utils/helpers";

interface NoFeedbackEntriesProps {
  category: string;
}

function NoFeedbackEntries({
  category,
}: NoFeedbackEntriesProps): React.JSX.Element {
  const formatCategory = formatCategoryLabel(category);

  const noFeedbackText =
    category === "all" ? (
      "There is no feedback yet."
    ) : (
      <>
        No feedback found in the
        <span>{formatCategory}</span> category.
      </>
    );
  return (
    <div>
      <div>
        <p>{noFeedbackText}</p>
        <p>Got a suggestion? Found a bug that needs to be squashed?</p>
        <p>We love hearing about new ideas to improve our app.</p>
      </div>
    </div>
  );
}

export default NoFeedbackEntries;
