import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ModalType } from "../../ui/modal/modalConfig";

interface ModalState {
  isOpen: boolean;
  modalType: ModalType | null;
  confirmPayload: string | undefined;
}

const initialState: ModalState = {
  isOpen: false,
  modalType: null,
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
      state.confirmPayload = action.payload.confirmPayload || undefined;
    },

    hideModal(state) {
      state.isOpen = false;
      state.modalType = null;
      state.confirmPayload = undefined;
    },
  },
});

export const { showModal, hideModal } = modalSlice.actions;
export default modalSlice.reducer;
