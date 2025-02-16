import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackFormBest from "./FeedbackFormBest";
import { FeedbackFormData } from "../../types/feedback.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";
import { hasFormChanged } from "../../utils/helpers";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
};

function CreateFeedbackBest(): React.JSX.Element {
  const dispatch = useDispatch();
  const formData = useActionData() as FeedbackFormData;
  const { state } = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const prevPage = useRef(state?.from);
  const [isFormDirty, setIsFormDirty] = useState(false);

  function handleCancel(e) {
    if (!isFormDirty) {
      navigate(prevPage.current);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_addFeedback",
          confirmPayload: prevPage.current,
        })
      );
    }
  }

  function handleFormChange(e: { currentTarget: HTMLFormElement | undefined }) {
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const isDirty = hasFormChanged(initialFormState, data);

    if (isDirty !== isFormDirty) setIsFormDirty(isDirty);
  }

  return (
    <FeedbackFormBest
      handleChange={handleFormChange}
      method="post"
      footer={
        <>
          <button disabled={isSubmitting || isFormDirty === false}>
            {isSubmitting ? "Submitting..." : "Add Feedback"}
          </button>
          <button type="button" onClick={(e) => handleCancel(e)}>
            Cancel
          </button>
        </>
      }
      errors={formData?.errors}
    />
  );
}

export default CreateFeedbackBest;
