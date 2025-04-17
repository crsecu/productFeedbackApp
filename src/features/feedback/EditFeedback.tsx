import FeedbackForm from "./FeedbackForm";
import FormField from "./FormField";
import SelectField from "./SelectField";
import { useFetcher, useParams } from "react-router-dom";
import { showModal } from "../../store/slices/modalSlice";
import { useAppDispatch } from "../../types/redux.hooks";
import BannerNotification from "../../ui/BannerNotification";
import { getFeedbackFormResponse } from "../../utils/helpers";
import { EditFeedbackFormValues } from "../../types/form.types";
import { STATUS_OPTIONS } from "../../types/feedback.types";

interface EditFeedbackProps {
  editableFeedback?: EditFeedbackFormValues;
  setShowEditFeedback: React.Dispatch<React.SetStateAction<boolean>>;
}

function EditFeedback({
  editableFeedback,
  setShowEditFeedback,
}: EditFeedbackProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { feedbackId } = useParams();
  const fetcher = useFetcher();
  console.log("Edit Feedback");
  const { actionType, submissionOutcome, isSubmissionSuccessful, showForm } =
    getFeedbackFormResponse<EditFeedbackFormValues>(fetcher?.data) || {};

  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      setShowEditFeedback(false);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_editFeedback",
          confirmPayload: feedbackId,
        })
      );
    }
  }

  const notification = (
    <BannerNotification
      actionType={actionType}
      notificationType={submissionOutcome}
    />
  );
  return (
    <div className={`formModal ${!isSubmissionSuccessful ? "fullSize" : ""}`}>
      <div>
        <button onClick={() => setShowEditFeedback(false)}>x</button>
        {notification}
        {showForm && (
          <>
            <h1>Editing title</h1>

            <FeedbackForm
              method="patch"
              defaultValues={editableFeedback}
              buttons={
                <>
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(
                        showModal({
                          modalType: "delete_feedback",
                          confirmPayload: feedbackId,
                        })
                      );
                    }}
                  >
                    Delete
                  </button>
                </>
              }
              actionRoute="editFeedback"
              onCancel={handleCancel}
              FormComponent={fetcher.Form}
              submissionStatus={fetcher.state}
              actionResult={fetcher.data}
              submitBtnText={"Update Feedback"}
            >
              <FormField
                inputId="feedbackStatus"
                label="Update Status"
                description="Change feature state"
                inputGuidanceId="feedbackStatusDesc"
              >
                <SelectField
                  name="status"
                  id="feedbackStatus"
                  options={STATUS_OPTIONS}
                  describedById="feedbackStatusDesc"
                  initialValue={editableFeedback?.status}
                />
              </FormField>
            </FeedbackForm>
          </>
        )}
      </div>
    </div>
  );
}

export default EditFeedback;
