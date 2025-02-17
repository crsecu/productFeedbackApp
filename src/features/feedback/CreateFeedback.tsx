import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackForm from "./FeedbackForm";
import { FeedbackFormData } from "../../types/feedback.types";
import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
};

function CreateFeedback(): React.JSX.Element {
  const dispatch = useDispatch();
  const formData = useActionData() as FeedbackFormData;
  const { state } = useLocation();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const prevPage = useRef(state?.from);
  const [isFormDirty, setIsFormDirty] = useState(false);

  function handleCancel() {
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

  return (
    <FeedbackForm
      method="post"
      defaultValues={initialFormState}
      footer={
        <>
          <button disabled={isSubmitting || isFormDirty === false}>
            {isSubmitting ? "Submitting..." : "Add Feedback"}
          </button>
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        </>
      }
      isDirty={isFormDirty}
      setIsDirty={setIsFormDirty}
      errors={formData?.errors}
    />
  );
}

export default CreateFeedback;
