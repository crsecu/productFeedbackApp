import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FeedbackForm from "./FeedbackForm";

import { showModal } from "../../store/slices/modalSlice";

const initialFormState = {
  title: "",
  category: "feature",
  description: "",
};

function CreateFeedback(): React.JSX.Element {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleCancel(hasFormChanged: boolean) {
    if (!hasFormChanged) {
      navigate(-1);
    } else {
      dispatch(
        showModal({
          modalType: "cancel_addFeedback",
        })
      );
    }
  }

  return (
    <div className="formModal">
      <div className="createFeedback">
        <h1>Create New Feedback</h1>
        <FeedbackForm
          method="post"
          defaultValues={initialFormState}
          actionRoute="."
          onCancel={handleCancel}
        />
      </div>
    </div>
  );
}

export default CreateFeedback;
