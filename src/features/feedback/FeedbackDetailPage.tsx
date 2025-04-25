import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackCard from "./FeedbackCard";
import CommentCount from "../comments/CommentCount";
import FeedbackCardContent from "./FeedbackCardContent";
import UpvoteButton from "./UpvoteButton";

import { Feedback } from "../../types/feedback.types";
import EditFeedback from "./EditFeedback";
import { useState, useMemo } from "react";

function FeedbackDetailPage(): React.JSX.Element {
  const navigate = useNavigate();
  const feedback = useLoaderData() as Feedback;

  const [showEditFeedback, setShowEditFeedback] = useState(false);

  const { id, upvotes, title, description, category, status } = feedback;

  const editableFeedbackFields = useMemo(() => {
    return {
      title,
      description,
      category,
      status,
    };
  }, [category, description, status, title]);

  return (
    <>
      <ActionBar>
        <button
          onClick={() => {
            /* TO DO: Find a way to reset unwanted search params that carry out from feedbackBoard */
            navigate(-1);
          }}
        >
          Go Back
        </button>

        <button onClick={() => setShowEditFeedback(true)}>Edit Feedback</button>
      </ActionBar>

      {showEditFeedback && (
        <EditFeedback
          editableFeedback={editableFeedbackFields}
          setShowEditFeedback={setShowEditFeedback}
        />
      )}

      <FeedbackCard>
        <UpvoteButton feedbackId={id} initialUpvoteCount={upvotes} />
        <FeedbackCardContent feedback={feedback}>
          <CommentCount />
        </FeedbackCardContent>
      </FeedbackCard>

      <Outlet />
    </>
  );
}

export default FeedbackDetailPage;
