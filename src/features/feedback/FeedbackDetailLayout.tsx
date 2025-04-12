import { Outlet, useLoaderData, useNavigate } from "react-router-dom";
import ActionBar from "../../ui/ActionBar";
import FeedbackItem from "./FeedbackItem";
import CommentCount from "../comments/CommentCount";
import FeedbackCard from "./FeedbackCard";
import UpvoteButton from "./UpvoteButton";

import { Feedback } from "../../types/feedback.types";
import EditFeedback from "./EditFeedback";
import { useState, useMemo } from "react";

function FeedbackDetailLayout(): React.JSX.Element {
  const navigate = useNavigate();
  const feedback = useLoaderData() as Feedback;
  const [showEditFeedback, setShowEditFeedback] = useState(false);

  const { id, upvotes, title, description, category, status } = feedback;
  console.log("FeedbackDetail Layout");

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

        <button
          className="editButton"
          onClick={() => setShowEditFeedback(true)}
        >
          Edit Feedback
        </button>
      </ActionBar>

      {showEditFeedback && (
        <EditFeedback
          editableFeedback={editableFeedbackFields}
          setShowEditFeedback={setShowEditFeedback}
        />
      )}

      <FeedbackItem>
        <UpvoteButton feedbackId={id} initialUpvoteCount={upvotes} />
        <FeedbackCard feedback={feedback}>
          <CommentCount />
        </FeedbackCard>
      </FeedbackItem>

      <Outlet />
    </>
  );
}

export default FeedbackDetailLayout;
