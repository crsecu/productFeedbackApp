import { useNavigate } from "react-router-dom";
import { deleteFeedback } from "../services/apiFeedback";
import { hideModal } from "../store/slices/modalSlice";
import { showNotification } from "../store/slices/toastNotificationSlice";
import { useAppDispatch, useAppSelector } from "../types/hooks";
import assert from "../utils/TS_helpers";

function GlobalModal(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, modalType, content, confirmPayload } = useAppSelector(
    (state) => state.modal
  );

  if (!isOpen) return null;

  const handleConfirm = async () => {
    if (modalType === "delete_feedback") {
      try {
        assert(confirmPayload);
        await deleteFeedback(confirmPayload);
        console.log("Feedback entry deleted", confirmPayload);
        navigate(-1);

        dispatch(showNotification({ type: "deleteFeedback_success" }));
      } catch (err) {
        console.error("Failed to delete feedback:", err);
        dispatch(
          showNotification({
            type: "deleteFeedback_error",
            message: "Failed to delete feedback",
          })
        );
      }
    }

    if (modalType === "cancel_editFeedback") {
      navigate(`/feedbackDetail/${confirmPayload}`, {
        replace: true,
      });
    }

    if (modalType === "cancel_addFeedback") {
      assert(confirmPayload);
      navigate(confirmPayload);
    }

    dispatch(hideModal());
  };

  return (
    <div>
      <p>{content}</p>

      <>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => dispatch(hideModal())}>Cancel</button>
      </>
    </div>
  );
}

export default GlobalModal;
