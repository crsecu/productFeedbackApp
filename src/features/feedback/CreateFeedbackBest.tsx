import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import FeedbackFormBest from "./FeedbackFormBest";
import { FeedbackFormData } from "../../types/feedback.types";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { showModal } from "../../store/slices/modalSlice";

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

  function handleFormDismiss(e) {
    const formData = new FormData(e.target.form);

    const data = Object.fromEntries(formData);
    const hasFormChanged =
      JSON.stringify(initialFormState) !== JSON.stringify(data);

    console.log(
      "is data the same",
      JSON.stringify(initialFormState) === JSON.stringify(data),
      data
    );

    if (!hasFormChanged) {
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
    <FeedbackFormBest
      method="post"
      footer={
        <>
          <button disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Add Feedback"}
          </button>
          <button type="button" onClick={(e) => handleFormDismiss(e)}>
            Cancel
          </button>
        </>
      }
      errors={formData?.errors}
    />
  );
}

export default CreateFeedbackBest;
