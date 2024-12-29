//This state slice manages submitted suggestions and their associated comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackType } from "../../types/feedback.types";
import { AppState } from "../../store";
import assert from "../../utils/TS_helpers";

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

    addFeedbackUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      const feedbackEntry = state.feedbackList.find((item) => {
        return item.id === action.payload;
      });

      assert(feedbackEntry, "Upvoting a new feedback failed.");

      feedbackEntry.upvotes += 1;
    },

    removeFeedbackUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      const feedbackEntry = state.feedbackList.find((item) => {
        return item.id === action.payload;
      });

      assert(feedbackEntry);
      feedbackEntry.upvotes -= 1;
    },
  },
});

export const { setFeedbackList, addFeedbackUpvote, removeFeedbackUpvote } =
  feedbackSlice.actions;
export default feedbackSlice.reducer;

/* Redux Selectors */
export const getFeedbackDataById =
  (id: string | undefined) => (state: AppState) => {
    assert(id, "Invalid feedback ID provided");
    const data = state.feedback.feedbackList.find(
      (feedback) => feedback.id === id
    );

    assert(data, `No feedback found for ID: ${id}`);

    return data;
  };

//Get Feedback upvote count by id
export const getFeedbackUpvoteCount =
  (id: string | undefined) => (state: AppState) => {
    assert(id, "Invalid feedback ID provided");
    const data = state.feedback.feedbackList.find(
      (feedback) => feedback.id === id
    );

    return data?.upvotes;
  };

//Filter Feedback by category
export const getFeedbackByCategory =
  (category: string) => (state: AppState) => {
    if (category === "all") {
      const fullFeedbackList = state.feedback.feedbackList;
      return fullFeedbackList;
    }

    const data = state.feedback.feedbackList.filter(
      (feedback) => feedback.category === category
    );

    return data;
  };
