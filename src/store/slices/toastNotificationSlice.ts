import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type NotificationType =
  | "createFeedback_success"
  | "createFeedback_error"
  | "editFeedback_success"
  | "editFeedback_error"
  | "deleteFeedback_success"
  | "deleteFeedback_error";

const NOTIFICATION_MESSAGES: Record<NotificationType, string> = {
  createFeedback_success: "Your feedback has been submitted successfully!",
  createFeedback_error: "Failed to submit feedback. Please try again.",
  editFeedback_success: "Your feedback has been updated successfully!",
  editFeedback_error: "Failed to update feedback. Please try again.",
  deleteFeedback_success: "Your feedback has been deleted successfully!",
  deleteFeedback_error: "Failed to delete feedback. Please try again.",
};

interface ToastNotificationState {
  isVisible: boolean;
  type: NotificationType | null;
  message: string | null;
}
const initialState: ToastNotificationState = {
  isVisible: false,
  type: null,
  message: null,
};

const toastNotificationSlice = createSlice({
  name: "toastNotification",
  initialState,
  reducers: {
    showNotification(
      state,
      action: PayloadAction<{ type: NotificationType; message?: string }>
    ) {
      state.isVisible = true;
      state.type = action.payload.type;
      state.message = NOTIFICATION_MESSAGES[action.payload.type];
    },

    hideNotification(state) {
      state.isVisible = false;
      state.type = null;
      state.message = null;
    },
  },
});

export const { showNotification, hideNotification } =
  toastNotificationSlice.actions;
export default toastNotificationSlice.reducer;
