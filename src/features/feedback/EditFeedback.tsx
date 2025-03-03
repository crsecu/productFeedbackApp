import { useState } from "react";
import {
  FeedbackActionResult,
  FeedbackFormData,
  StatusType,
} from "../../types/feedback.types";
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

  const formData = useActionData() as FeedbackActionResult;
  const isSubmitting = navigation.state === "submitting";
  console.log("sss", navigationState);
  const [initialFeedbackData] = useState(navigationState);
  const [hasFormChanged, setHasFormChanged] = useState(false);

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

  return (
    <>
      <h1>Editing {initialFeedbackData.data.title}</h1>
      <FeedbackForm
        method="patch"
        defaultValues={initialFeedbackData.data}
        footer={
          <>
            <button disabled={isSubmitting || hasFormChanged === false}>
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
        errors={formData?.errors}
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
  );
}

export default EditFeedback;
