import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ToastKey } from "../../ui/notifications/toastNotificationConfig";

interface ToastNotificationState {
  isVisible: boolean;
  key: ToastKey | null;
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
      state.key = action.payload.key;
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
