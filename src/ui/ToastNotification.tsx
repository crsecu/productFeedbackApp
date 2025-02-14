import { useAppDispatch, useAppSelector } from "../types/hooks";
import { hideNotification } from "../store/slices/toastNotificationSlice";
import { useEffect } from "react";

function ToastNotification(): React.JSX.Element | null {
  const dispatch = useAppDispatch();
  const { isVisible, type, message } = useAppSelector(
    (state) => state.toastNotification
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch(hideNotification());
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [dispatch, isVisible]);

  const toastNotificationColor =
    type === "deleteFeedback_success" ? "lightskyblue" : "coral";

  if (!isVisible) return null;
  return (
    <div style={{ backgroundColor: toastNotificationColor }}>
      <button onClick={() => dispatch(hideNotification())}>x</button>
      <p>{message}</p>
    </div>
  );
}

export default ToastNotification;
