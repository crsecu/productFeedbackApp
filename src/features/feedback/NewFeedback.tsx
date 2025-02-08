import { useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import UpvoteButton from "./UpvoteButton";
import FeedbackCard from "./FeedbackCard";
import FeedbackItem from "./FeedbackItem";
import { useAppSelector } from "../../types/hooks";
import { getFeedbackById } from "../../store/slices/feedbackSlice";

interface NewFeedbackProps {
  newFeedbackId: string;
}
function NewFeedback({
  newFeedbackId,
}: NewFeedbackProps): React.JSX.Element | null {
  const [searchParams, setSearchParams] = useSearchParams();

  const newFeedback = useAppSelector(getFeedbackById(newFeedbackId));

  useEffect(() => {
    const timerId = setTimeout(() => {
      setSearchParams({});
    }, 4000);

    return () => clearTimeout(timerId);
  }, [setSearchParams]);

  if (!newFeedback) return null;

  return (
    <div style={{ border: "10px solid #be70be" }}>
      <p>NEW NEW NEW!!!</p>

      <FeedbackItem>
        <UpvoteButton feedbackId={newFeedback.id} initialUpvoteCount={0} />

        <Link to={`/feedbackDetail/${newFeedback.id}`}>
          <FeedbackCard feedback={newFeedback} />
        </Link>
      </FeedbackItem>
    </div>
  );
}

export default NewFeedback;
