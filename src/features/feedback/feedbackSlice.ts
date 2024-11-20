//This state slice manages submitted suggestions and their associated comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback } from "./feedback.types";

interface FeedbackState {
  feedbackList: Feedback[];
}

const initialState: FeedbackState = {
  feedbackList: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackData(state, action: PayloadAction<Feedback[]>) {
      //payload = feedback data fetched from API
      state.feedbackList = action.payload;
    },
  },
});

export const { setFeedbackData } = feedbackSlice.actions;
export default feedbackSlice.reducer;
