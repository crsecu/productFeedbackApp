import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModalState {
  isOpen: boolean;
  modalType: "DELETE_FEEDBACK" | null;
  content: string | null;
  confirmPayload?: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
  content: null,
  confirmPayload: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal(
      state,
      action: PayloadAction<{
        modalType: "DELETE_FEEDBACK";
        confirmPayload: string;
      }>
    ) {
      state.isOpen = true;
      state.modalType = action.payload.modalType;
      state.content =
        action.payload.modalType === "DELETE_FEEDBACK"
          ? "Are you sure you want to delete this feedback?"
          : "Default model content";
      state.confirmPayload = action.payload.confirmPayload;
    },

    hideModal(state) {
      state.isOpen = false;
      state.modalType = null;
      state.content = null;
      state.confirmPayload = null;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
