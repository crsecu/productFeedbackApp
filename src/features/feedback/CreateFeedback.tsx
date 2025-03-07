import { useState } from "react";
import { useDispatch } from "react-redux";
import { useActionData, useNavigate, useNavigation } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import { FeedbackActionResult } from "../../types/feedback.types";
import { showModal } from "../../store/slices/modalSlice";
import BannerNotification from "../../ui/BannerNotification";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
};

function CreateFeedback(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();

  const [hasFormChanged, sethasFormChanged] = useState(false);

  const actionResponse = useActionData() as FeedbackActionResult | undefined;

  const isSubmitting = navigation.state === "submitting";

  console.log("data from action", actionResponse);

  const submissionStatus = actionResponse?.success ?? null;
  const validationErrors = actionResponse?.validationErrors ?? null;

  function handleCancel() {
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
        submissionStatus ? "createFeedback_success" : "createFeedback_failed"
      }
    >
      {submissionStatus && (
        <>
          <button
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </button>
          <button
            onClick={() =>
              navigate(`/feedbackDetail/${actionResponse?.payload?.id}`, {
                replace: true,
              })
            }
          >
            View Details
          </button>
        </>
      )}
    </BannerNotification>
  );

  return (
    <div className="createFeedbackModal">
      {submissionStatus !== null && notification}

      {!submissionStatus && (
        <>
          <h1>Create New Feedback</h1>
          <FeedbackForm
            method="post"
            defaultValues={initialFormState}
            footer={
              <>
                <button disabled={isSubmitting || hasFormChanged === false}>
                  {isSubmitting ? "Submitting..." : "Add Feedback"}
                </button>
                <button type="button" onClick={handleCancel}>
                  Cancel
                </button>
              </>
            }
            isDirty={hasFormChanged}
            setIsDirty={sethasFormChanged}
            errors={validationErrors}
            actionRoute="."
          />
        </>
      )}
    </div>
  );
}

export default CreateFeedback;
