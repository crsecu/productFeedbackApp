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
import { DeleteButton, FormSection } from "../../styles/UIStyles";
import editFeedbackIcon from "../../assets/images/editFeedback-icon.svg";
import { H1 } from "../../styles/Typography";

interface EditFeedbackProps {
  editableFeedback: EditFeedbackFormValues;
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
      <>
        <button onClick={() => setShowEditFeedback(false)}>x</button>
        {notification}
        {showForm && (
          <FormSection>
            <img src={editFeedbackIcon} alt="" />
            <H1>Editing "{editableFeedback.title}"</H1>

            <FeedbackForm
              method="patch"
              defaultValues={editableFeedback}
              buttons={
                <>
                  <DeleteButton
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
                  </DeleteButton>
                </>
              }
              actionRoute="editFeedback"
              onCancel={handleCancel}
              FormComponent={fetcher.Form}
              submissionStatus={fetcher.state}
              actionResult={fetcher.data}
              submitBtnText={"Save Changes"}
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
          </FormSection>
        )}
      </>
    </div>
  );
}

export default EditFeedback;
