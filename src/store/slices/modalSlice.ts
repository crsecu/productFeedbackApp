import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalText {
  title: string;
  description: string;
  decisionButton: string;
  wayoutButton: string;
}
type ModalType =
  | "delete_feedback"
  | "cancel_editFeedback"
  | "cancel_addFeedback";

const MODAL_MESSAGES: Record<ModalType, ModalText> = {
  cancel_addFeedback: {
    title: "Discard Feedback Draft?",
    description:
      "You will loose all the information entered for this feedback.",
    decisionButton: "Discard Feedback",
    wayoutButton: "Keep it",
  },
  cancel_editFeedback: {
    title: "Discard Feedback Changes?",
    description: "You will loose all the changes made to this feedback.",
    decisionButton: "Discard changes",
    wayoutButton: "Keep editing",
  },
  delete_feedback: {
    title: "Delete Feedback?",
    description:
      "This action will permanently remove the feedback and cannot be undone.",
    decisionButton: "Delete",
    wayoutButton: "Cancel",
  },
};

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  content: ModalText | null;
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
