import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ModalType =
  | "delete_feedback"
  | "cancel_editFeedback"
  | "cancel_addFeedback";

const MODAL_MESSAGES: Record<ModalType, string> = {
  cancel_addFeedback:
    "Are you sure you want to cancel creating this feedback? Your changes will be lost.",
  cancel_editFeedback:
    "Are you sure you want to cancel editing this feedback? Unsaved changes will be lost.",
  delete_feedback: "Are you sure you want to delete this feedback?",
};

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  content: string | null;
  confirmPayload: string | undefined;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  content: null,
  confirmPayload: undefined,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(
      state,
      action: PayloadAction<{
        modalType: ModalType;
        confirmPayload?: string;
      }>
    ) {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.content = MODAL_MESSAGES[action.payload.modalType];
      state.confirmPayload = action.payload.confirmPayload || undefined;
    },

    hideModal(state) {
      state.isOpen = false;
      state.modalType = null;
      state.content = null;
      state.confirmPayload = undefined;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
