import { useNavigate } from "react-router-dom";
import { deleteFeedback } from "../services/apiFeedback";
import { hideModal } from "../store/slices/modalSlice";
import { showNotification } from "../store/slices/toastNotificationSlice";
import { useAppDispatch, useAppSelector } from "../types/redux.hooks";
import assert from "../utils/TS_helpers";
import { closeEditFeedback } from "../store/slices/feedbackDetailSlice";

function GlobalModal(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isOpen, modalType, content, confirmPayload } = useAppSelector(
    (state) => state.modal
  );

  if (!isOpen) return null;
  console.log("did GLOBAL MODAL RENDER");
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
    if (modalType === "cancel_addFeedback") {
      navigate(-1);
    }

    if (modalType === "cancel_editFeedback") {
      dispatch(closeEditFeedback());
    }

    if (modalType) dispatch(hideModal());
  };

  return (
    <div className="globalModal">
      <p>{content}</p>

      <>
        <button onClick={handleConfirm}>Confirm</button>
        <button onClick={() => dispatch(hideModal())}>Cancel</button>
      </>
    </div>
  );
}

export default GlobalModal;
