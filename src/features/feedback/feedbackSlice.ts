//This state slice manages submitted suggestions and their associated comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback } from "./feedback.types";

interface FeedbackState {
  feedback: Feedback[];
}

const initialState: FeedbackState = {
  feedback: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackData(state, action: PayloadAction<Feedback[]>) {
      //payload = feedback data fetched from API
      state.feedback = action.payload;
    },
  },
});

export const { setFeedbackData } = feedbackSlice.actions;
export default feedbackSlice.reducer;
