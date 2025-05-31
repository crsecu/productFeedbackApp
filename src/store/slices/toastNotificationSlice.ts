import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type ToastKey =
  | "deleteFeedback_success"
  | "deleteFeedback_error"
  | "upvoteFeedback_success"
  | "upvoteFeedback_error";

const NOTIFICATION_MESSAGES: Record<
  ToastKey,
  { type: "success" | "error"; message: string }
> = {
  deleteFeedback_success: {
    type: "success",
    message: "Your feedback has been deleted successfully!",
  },

  deleteFeedback_error: {
    type: "error",
    message: "Failed to delete feedback. Please try again.",
  },
  upvoteFeedback_success: {
    type: "success",
    message: "Upvoted!",
  },
  upvoteFeedback_error: {
    type: "error",
    message: "Couldn't upvote. Check your connection and try again.",
  },
};

interface ToastNotificationState {
  isVisible: boolean;
  key: { type: "success" | "error"; message: string } | null;
}
const initialState: ToastNotificationState = {
  isVisible: false,
  key: null,
};

const toastNotificationSlice = createSlice({
  name: "toastNotification",
  initialState,
  reducers: {
    showToastNotification(state, action: PayloadAction<{ key: ToastKey }>) {
      state.isVisible = true;
      state.key = NOTIFICATION_MESSAGES[action.payload.key];
    },

    hideNotification(state) {
      state.isVisible = false;
      state.key = null;
    },
  },
});

export const { showToastNotification, hideNotification } =
  toastNotificationSlice.actions;
export default toastNotificationSlice.reducer;
