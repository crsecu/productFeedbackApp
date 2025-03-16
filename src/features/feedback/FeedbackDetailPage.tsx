import { useRouteLoaderData } from "react-router-dom";

import { FeedbackType } from "../../types/feedback.types";
import CommentCount from "../comments/CommentCount";
import FeedbackCard from "./FeedbackCard";

import FeedbackItem from "./FeedbackItem";
import UpvoteButton from "./UpvoteButton";
import FeedbackDetailContent from "./FeedbackDetailContent";

import { useState } from "react";
import { createPortal } from "react-dom";
import EditFeedback from "./EditFeedback";

function FeedbackDetailPage(): React.JSX.Element {
  const feedback = useRouteLoaderData("feedbackDetailData") as FeedbackType;
  const [showEditFeedback, setShowEditFeedback] = useState(false);

  const { title, description, category, status } = feedback;

  return (
    <>
      <button onClick={() => setShowEditFeedback(true)}>Edit</button>
      {showEditFeedback &&
        createPortal(
          <EditFeedback
            editableFeedback={{ title, description, category, status }}
            closeModal={() => setShowEditFeedback(false)}
          />,
          document.body
        )}

      <FeedbackDetailContent>
        <>
          <FeedbackItem>
            <UpvoteButton
              feedbackId={feedback.id}
              initialUpvoteCount={feedback.upvotes}
            />
            <FeedbackCard feedback={feedback}>
              <CommentCount />
            </FeedbackCard>
          </FeedbackItem>
        </>
      </FeedbackDetailContent>
    </>
  );
}

export default FeedbackDetailPage;
//

//

//

/* TO DO: instead of checking for "dataFromLoader" in the component, throw an error in the loader to prevent rendering when data is missing */
//if (!dataFromLoader) return <h1>Feedback Detail is not available.</h1>;
