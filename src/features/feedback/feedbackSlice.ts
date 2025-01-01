//This state slice manages submitted suggestions and their associated comments
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackType } from "../../types/feedback.types";
import { AppState } from "../../store";
import assert from "../../utils/TS_helpers";
import { filterFeedbackByStatus } from "../../utils/helpers";

export const statusCategories = [
  "suggestion",
  "planned",
  "in-progress",
  "live",
] as const;

type StatusCategoryType = (typeof statusCategories)[number];

interface feedbackByStatusCategoryType {
  suggestion: FeedbackType[];
  planned: FeedbackType[];
  "in-progress": FeedbackType[];
  live: FeedbackType[];
}

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
    }, //TO DO: delete this reducer if not needed

    removeFeedbackUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      const feedbackEntry = state.feedbackList.find((item) => {
        return item.id === action.payload;
      });

      assert(feedbackEntry);
      feedbackEntry.upvotes -= 1;
    }, //TO DO: delete this reducer if not needed
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

//Selects feedback entries from the Redux state that match the specified status
export const getFeedbackByStatus = (status: string) => (state: AppState) => {
  const data = filterFeedbackByStatus(state.feedback.feedbackList, status);

  return data;
};

//Selects feedback entries from Redux store that match all specified status categories present in the provided argument (array)
export const getFeedbackByAllStatusCategories =
  (categories: readonly StatusCategoryType[]) => (state: AppState) => {
    const feedbackByStatusCategory: feedbackByStatusCategoryType = {
      suggestion: [],
      planned: [],
      "in-progress": [],
      live: [],
    };

    categories.forEach((statusCategory) => {
      const data = filterFeedbackByStatus(
        state.feedback.feedbackList,
        statusCategory
      );
      feedbackByStatusCategory[statusCategory] = data;
    });

    return feedbackByStatusCategory;
  };

//Calculates the count of feedback entries for each status category; returns an object with the count of feedback entries for each status category
export const selectFeedbackCountsByStatus = (state: AppState) => {
  const feedbackCounts = {
    suggestion: 0,
    planned: 0,
    "in-progress": 0,
    live: 0,
  };

  for (const status of statusCategories) {
    const matchingFeedbackEntries = filterFeedbackByStatus(
      state.feedback.feedbackList,
      status
    );

    feedbackCounts[status] = matchingFeedbackEntries.length;
  }
  console.log("feedback status counts", feedbackCounts);

  return feedbackCounts;
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
