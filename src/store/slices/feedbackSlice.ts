import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackType } from "../../types/feedback.types";
import { AppState } from "../store";
import assert from "../../utils/TS_helpers";
import { filterFeedbackByStatus } from "../../utils/helpers";

interface FeedbackState {
  feedbackList: FeedbackType[];
}

const initialState: FeedbackState = {
  feedbackList: [],
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackList(state, action: PayloadAction<FeedbackType[]>) {
      //payload = feedback list fetched from API
      state.feedbackList = action.payload;
    },
  },
});

export const { setFeedbackList } = feedbackSlice.actions;
export default feedbackSlice.reducer;

/* SELECTORS */
//Get Feedback upvote count by id
export const getFeedbackUpvoteCount =
  (id: string | undefined) => (state: AppState) => {
    assert(id, "Invalid feedback ID provided");
    const data = state.feedback.feedbackList.find(
      (feedback) => feedback.id === id
    );

    return data?.upvotes;
  };

//Calculates the count of feedback entries matching the specified status and category
export const getCountOfFeedbackByStatusAndCategory =
  (status: string = "all", category: string) =>
  (state: AppState) => {
    const feedbackEntries = filterFeedbackByStatus(
      state.feedback.feedbackList,
      status
    );
    if (category === "all") return feedbackEntries.length;

    const matchingFeedbackEntries = feedbackEntries.filter(
      (feedbackEntry) => feedbackEntry.category === category
    );

    return matchingFeedbackEntries.length;
  };

// Get feedback by id (useful to display Featured New Feedback)
export const getFeedbackById = (id: string) => (state: AppState) => {
  const feedback = state.feedback.feedbackList.filter((item) => item.id === id);
  return feedback[0];
};
