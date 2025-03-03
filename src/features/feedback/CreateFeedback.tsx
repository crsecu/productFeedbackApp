import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import { FeedbackActionResult } from "../../types/feedback.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
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
  const { state } = useLocation();

  const actionResponse = useActionData() as FeedbackActionResult | undefined;

  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";

  console.log("data from action", actionResponse);

  const submissionStatus = actionResponse?.success ?? null;
  const validationErrors = actionResponse?.validationErrors ?? null;

  const prevPageRef = useRef(state?.from);
  const [hasFormChanged, sethasFormChanged] = useState(false);

  function handleCancel() {
    if (!hasFormChanged) {
      navigate(prevPageRef.current);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_addFeedback",
          confirmPayload: prevPageRef.current,
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
          <button onClick={() => navigate(-1)}>Go back</button>
          <button
            onClick={() =>
              navigate(`/feedbackDetail/${actionResponse?.payload}`, {
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
    <>
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
          />
        </>
      )}
    </>
  );
}

export default CreateFeedback;
