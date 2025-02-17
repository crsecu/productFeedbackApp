import { useState } from "react";
import { FeedbackFormData, StatusType } from "../../types/feedback.types";
import FeedbackFormBest from "./FeedbackFormBest";
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

function EditFeedbackBest(): React.JSX.Element {
  const dispatch = useAppDispatch();
  const { state } = useLocation();
  const formData = useActionData() as FeedbackFormData;
  const navigation = useNavigation();
  const navigate = useNavigate();
  const isSubmitting = navigation.state === "submitting";

  const [initialFeedbackData] = useState(state);
  const [isFormDirty, setIsFormDirty] = useState(false);

  function handleCancel(e: React.MouseEvent<HTMLButtonElement>) {
    const formElement = e.currentTarget.form;

    if (!formElement) {
      console.warn("Warning!!! Button is not inside a form");
      return;
    }

    if (!isFormDirty) {
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
    <FeedbackFormBest
      method="patch"
      defaultValues={initialFeedbackData.data}
      footer={
        <>
          <button disabled={isSubmitting || isFormDirty === false}>
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
      isDirty={isFormDirty}
      setIsDirty={setIsFormDirty}
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
    </FeedbackFormBest>
  );
}

export default EditFeedbackBest;
