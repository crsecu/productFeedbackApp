//This state slice manages submitted suggestions and their associated comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback } from "./feedback.types";
import { AppState } from "../../store";
import assert from "../../utils/TS_helpers";

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

// Redux Selectors
export const getFeedbackDataById =
  (id: string | undefined) => (state: AppState) => {
    assert(id, "Invalid feedback ID provided");
    const data = state.feedback.feedbackList.find(
      (feedback) => feedback.id === id
    );

    assert(data, `No feedback found for ID: ${id}`);

    return data;
  };
