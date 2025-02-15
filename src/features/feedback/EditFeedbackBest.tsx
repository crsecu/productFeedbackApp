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

  const [feedback] = useState(state);

  function handleFormDismiss(e: React.MouseEvent<HTMLButtonElement>) {
    const formElement = e.currentTarget.form;
    if (!formElement) {
      console.log("Warning!!! Button is not inside a form");
      return; // Prevents null access errors
    }

    const formData = new FormData(formElement);

    const data = Object.fromEntries(formData);
    console.log(
      "is data the same",
      JSON.stringify(data) === JSON.stringify(feedback.data),
      data
    );

    const hasFormChanged =
      JSON.stringify(data) !== JSON.stringify(feedback.data);
    console.log("has edit form changed ", hasFormChanged);

    if (!hasFormChanged) {
      navigate(`/feedbackDetail/${feedback.id}`, {
        replace: true,
      });
    } else {
      dispatch(
        showModal({
          modalType: "cancel_editFeedback",
          confirmPayload: feedback.id,
        })
      );
    }
  }

  return (
    <FeedbackFormBest
      method="patch"
      defaultValues={feedback.data}
      footer={
        <>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Saving Changes..." : "Save Changes"}
          </button>
          <button type="button" onClick={(e) => handleFormDismiss(e)}>
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(
                showModal({
                  modalType: "delete_feedback",
                  confirmPayload: feedback.id,
                })
              );
            }}
          >
            Delete
          </button>
        </>
      }
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
          initialValue={feedback.data.status}
        />
      </FormField>
    </FeedbackFormBest>
  );
}

export default EditFeedbackBest;
