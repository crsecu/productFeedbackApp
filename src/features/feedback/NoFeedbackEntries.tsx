import { formatCategoryLabel } from "../../utils/helpers";
import detectiveImage from "../../assets/images/no-feedback-image.svg";

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
    <>
      <div>
        <img src={detectiveImage} alt="No feedback" />
        <p>{noFeedbackText}</p>
        <p>Got a suggestion? Found a bug that needs to be squashed?</p>
        <p>We love hearing about new ideas to improve our app.</p>
      </div>
    </>
  );
}

export default NoFeedbackEntries;
