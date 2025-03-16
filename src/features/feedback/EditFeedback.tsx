import { EditedFeedbackType, StatusType } from "../../types/feedback.types";
import FeedbackForm from "./FeedbackForm";
import FormField from "./FormField";
import SelectField from "./SelectField";
import { useParams } from "react-router-dom";
import { showModal } from "../../store/slices/modalSlice";
import { useAppDispatch } from "../../types/hooks";

const statusOptions: StatusType[] = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
];
interface EditFeedbackProps {
  editableFeedback: EditedFeedbackType;
  closeModal: () => void;
}

function EditFeedback({
  editableFeedback,
  closeModal,
}: EditFeedbackProps): React.JSX.Element {
  const dispatch = useAppDispatch();

  const { feedbackId } = useParams();

  //TO DO: Check this functionality after refactoring rest
  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      closeModal();
    } else {
      dispatch(
        showModal({
          modalType: "cancel_editFeedback",
        })
      );
    }
  }

  return (
    <div className="formModal">
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
    </div>
  );
}

export default EditFeedback;
