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
    const timeoutId = setTimeout(() => {
      setSearchParams({});
    }, 4000);

    return () => clearTimeout(timeoutId);
  }, [setSearchParams]);

  if (!newFeedback) return null;

  return (
    <div style={{ border: "10px solid #be70be" }}>
      <p>Your feedback has been submitted. Others can now engage with it!</p>

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
