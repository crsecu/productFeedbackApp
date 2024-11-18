//This state slice manages submitted suggestions and their associated comments
import { createSlice } from "@reduxjs/toolkit";
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
  reducers: {},
});

export default feedbackSlice.reducer;
