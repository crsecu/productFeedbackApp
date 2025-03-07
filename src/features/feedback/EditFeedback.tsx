import { useState } from "react";
import { FeedbackActionResult, StatusType } from "../../types/feedback.types";
import FeedbackForm from "./FeedbackForm";
import FormField from "./FormField";
import SelectField from "./SelectField";
import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { showModal } from "../../store/slices/modalSlice";
import { useAppDispatch } from "../../types/hooks";
import BannerNotification from "../../ui/BannerNotification";

const statusOptions: StatusType[] = [
  "suggestion",
  "planned",
  "in-Progress",
  "live",
];

function EditFeedback(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { state: navigationState } = useLocation();
  const navigation = useNavigation();
  const navigate = useNavigate();

  const actionResponse = useActionData() as FeedbackActionResult;
  const isSubmitting = navigation.state === "submitting";

  const [initialFeedbackData] = useState(navigationState);
  const [hasFormChanged, setHasFormChanged] = useState(false);

  const submissionStatus = actionResponse?.success ?? null; //TO DO: defaulting to null may not be necessary - check later
  const validationErrors = actionResponse?.validationErrors ?? null;

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    const formElement = e.currentTarget.form;

    if (!formElement) {
      console.warn("Warning!!! Button is not inside a form");
      return;
    }

    if (!hasFormChanged) {
      navigate(`/feedbackDetail/${initialFeedbackData.id}`, {
        replace: true,
      });
    } else {
      dispatch(
        showModal({
          modalType: "cancel_editFeedback",
          confirmPayload: initialFeedbackData.id,
        })
      );
    }
  }

  //notification
  const notification = (
    <BannerNotification
      notificationType={
        submissionStatus ? "editFeedback_success" : "editFeedback_failed"
      }
    >
      {submissionStatus && (
        <>
          <button
            onClick={() => {
              navigate(`/feedbackDetail/${initialFeedbackData.id}`, {
                replace: true,
                state: actionResponse?.payload,
              });
            }}
          >
            Close
          </button>
        </>
      )}
    </BannerNotification>
  );

  return (
    <div className="editFeedbackModal">
      {submissionStatus !== null && notification}

      {!submissionStatus && (
        <>
          <h1>Editing {initialFeedbackData.data.title}</h1>

          <FeedbackForm
            method="patch"
            defaultValues={initialFeedbackData.data}
            footer={
              <>
                <button
                  disabled={isSubmitting || hasFormChanged === false}
                  name="intent"
                  value="editFeedback"
                >
                  {isSubmitting ? "Saving Changes..." : "Save Changes"}
                </button>
                <button type="button" onClick={(e) => handleCancel(e)}>
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    dispatch(
                      showModal({
                        modalType: "delete_feedback",
                        confirmPayload: initialFeedbackData.id,
                      })
                    );
                  }}
                >
                  Delete
                </button>
              </>
            }
            isDirty={hasFormChanged}
            setIsDirty={setHasFormChanged}
            errors={validationErrors}
            actionRoute="."
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
                initialValue={initialFeedbackData.data.status}
              />
            </FormField>
          </FeedbackForm>
        </>
      )}
    </div>
  );
}

export default EditFeedback;
