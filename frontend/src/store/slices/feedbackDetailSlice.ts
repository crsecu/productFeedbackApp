import { createSlice } from "@reduxjs/toolkit";

interface FeedbackDetailState {
  isEditing: boolean;
}

const initialState: FeedbackDetailState = {
  isEditing: false,
};

const feedbackDetailSlice = createSlice({
  name: "feedbackDetail",
  initialState,
  reducers: {
    openEditFeedback(state) {
      state.isEditing = true;
    },

    closeEditFeedback(state) {
      state.isEditing = false;
    },
  },
});

export const { openEditFeedback, closeEditFeedback } =
  feedbackDetailSlice.actions;

export default feedbackDetailSlice.reducer;
