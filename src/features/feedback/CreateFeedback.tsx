import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

import { showModal } from "../../store/slices/modalSlice";
import { SuggestionFeedback } from "../../types/feedback.types";

import BannerNotification from "../../ui/BannerNotification";
import { useAppDispatch } from "../../types/redux.hooks";
import { getFeedbackFormResponse } from "../../utils/helpers";
import { CreateFeedbackFormValues } from "../../types/form.types";
import { ActionResult } from "../../types/action.types";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
} as CreateFeedbackFormValues;

function CreateFeedback(): React.JSX.Element {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const navigation = useNavigation();

  const actionData = useActionData() as ActionResult<SuggestionFeedback>;
  const {
    actionType,
    submissionOutcome,
    isSubmissionSuccessful,
    showForm,
    payload,
  } = getFeedbackFormResponse<SuggestionFeedback>(actionData) || {};

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
      notificationType={submissionOutcome}
      actionType={actionType}
    >
      {isSubmissionSuccessful && (
        <>
          <button
            onClick={() =>
              navigate(`/feedbackDetail/${payload?.id}`, { replace: true })
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
    <div>
      {notification}
      {showForm && (
        <div>
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
