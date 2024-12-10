//This state slice manages submitted suggestions and their associated comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Feedback, Comment } from "./feedback.types";
import { AppState } from "../../store";
import assert from "../../utils/TS_helpers";

interface FeedbackState {
  feedbackList: Feedback[];
  commentList: Comment[]; //remove later when creating Comments Slice
}

const initialState: FeedbackState = {
  feedbackList: [],
  commentList: [], //remove later when creating Comments Slice
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackList(state, action: PayloadAction<Feedback[]>) {
      //payload = feedback list fetched from API
      state.feedbackList = action.payload;
    },

    addFeedbackUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      const feedbackEntry = state.feedbackList.find((item) => {
        return item.id === action.payload;
      });

      assert(feedbackEntry);
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

    setCommentList(state, action: PayloadAction<Comment[]>) {
      //payload = comment list fetched from API
      state.commentList = action.payload;
    },
  },
});

export const {
  setFeedbackList,
  setCommentList,
  addFeedbackUpvote,
  removeFeedbackUpvote,
} = feedbackSlice.actions;
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

    assert(data, `No feedback found for ID: ${id}`);

    return data?.upvotes;
  };
