import { useDispatch } from "react-redux";
import {
  Form,
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

import { showModal } from "../../store/slices/modalSlice";
import {
  SuggestionType,
  FeedbackActionResult,
  CreateFeedbackFormValues,
} from "../../types/feedback.types";

import BannerNotification from "../../ui/BannerNotification";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
} as CreateFeedbackFormValues;

function CreateFeedback(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  console.log("location CREATE FEEDBACK", location);

  /* data needed by FeedbackForm */
  const actionData = useActionData() as FeedbackActionResult<SuggestionType>;
  console.log("create feedback", actionData);

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
          <button onClick={() => navigate("..")}>Go Back</button>
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
