import { EditFeedbackFormValues, StatusType } from "../../types/feedback.types";
import FeedbackForm from "./FeedbackForm";
import FormField from "./FormField";
import SelectField from "./SelectField";
import { useFetcher, useParams } from "react-router-dom";
import { showModal } from "../../store/slices/modalSlice";
import { useAppDispatch } from "../../types/redux.hooks";
import BannerNotification from "../../ui/BannerNotification";
import { closeEditFeedback } from "../../store/slices/feedbackDetailSlice";
import { getFeedbackFormResponse } from "../../utils/helpers";

const statusOptions: StatusType[] = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
];
interface EditFeedbackProps {
  editableFeedback: EditFeedbackFormValues;
}

function EditFeedback({
  editableFeedback,
}: EditFeedbackProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { feedbackId } = useParams();
  const fetcher = useFetcher();

  const { actionType, submissionOutcome, isSubmissionSuccessful, showForm } =
    getFeedbackFormResponse<EditFeedbackFormValues>(fetcher?.data) || {};

  //TO DO: Check this functionality after refactoring rest
  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      dispatch(closeEditFeedback());
    } else {
      dispatch(
        showModal({
          modalType: "cancel_editFeedback",
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
      <div className="editFeedback">
        <button
          onClick={() => dispatch(closeEditFeedback())}
          style={{ marginLeft: "100%" }}
        >
          x
        </button>
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
                  options={statusOptions}
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
