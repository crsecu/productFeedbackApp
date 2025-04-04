import { useRouteLoaderData } from "react-router-dom";

import { FeedbackType } from "../../types/feedback.types";
import CommentCount from "../comments/CommentCount";
import FeedbackCard from "./FeedbackCard";

import FeedbackItem from "./FeedbackItem";
import UpvoteButton from "./UpvoteButton";
import FeedbackDetailContent from "./FeedbackDetailContent";
import { useMemo } from "react";
import { useAppDispatch, useAppSelector } from "../../types/redux.hooks";
import EditFeedback from "./EditFeedback";
import { openEditFeedback } from "../../store/slices/feedbackDetailSlice";

function FeedbackDetailPage(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const feedback = useRouteLoaderData("feedbackDetailData") as FeedbackType;

  const { title, description, category, status } = feedback;
  const editableFeedbackFields = useMemo(() => {
    return {
      title,
      description,
      category,
      status,
    };
  }, [category, description, status, title]);

  const isEditing = useAppSelector((state) => state.feedbackDetail.isEditing);

  return (
    <>
      <button onClick={() => dispatch(openEditFeedback())}>Edit</button>
      {isEditing && <EditFeedback editableFeedback={editableFeedbackFields} />}
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
