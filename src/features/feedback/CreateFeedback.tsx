import { useDispatch } from "react-redux";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

import { showModal } from "../../store/slices/modalSlice";
import { FeedbackActionResult } from "../../types/feedback.types";
import BannerNotification from "../../ui/BannerNotification";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
};

function CreateFeedback(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /* data needed by FeedbackForm */
  const actionData = useActionData() as FeedbackActionResult;
  const navigation = useNavigation();
  const isSubmissionSuccessful = actionData?.success ?? null;
  const newFeedackId = actionData?.payload?.id;
  console.log("act data", actionData);
  console.log("navigation", navigation);

  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      navigate(-1);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_addFeedback",
        })
      );
    }
  }

  const notification = (
    <BannerNotification
      notificationType={
        isSubmissionSuccessful
          ? "createFeedback_success"
          : "createFeedback_failed"
      }
    >
      {isSubmissionSuccessful && (
        <>
          <button
            onClick={() =>
              navigate(`/feedbackDetail/${newFeedackId}`, { replace: true })
            }
          >
            View Details
          </button>
          <button onClick={() => navigate(-1)}>Go Back</button>
        </>
      )}
    </BannerNotification>
  );

  return (
    <div className={`formModal ${!isSubmissionSuccessful ? "fullSize" : ""}`}>
      {isSubmissionSuccessful !== null && notification}
      {!isSubmissionSuccessful && (
        <div className="createFeedback">
          <h1>Create New Feedback</h1>
          <FeedbackForm
            method="post"
            defaultValues={initialFormState}
            actionRoute="."
            onCancel={handleCancel}
            FormComponent={Form}
            submissionStatus={navigation.state}
            actionResult={actionData}
            submitBtnText={"Submit Feedback"}
          />
        </div>
      )}
    </div>
  );
}

export default CreateFeedback;
