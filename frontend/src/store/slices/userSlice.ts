import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

import { LoggedinUserProfile } from "../../types/user.types";

interface UserState {
  isUserLoggedIn: boolean;
  profileInfo: LoggedinUserProfile;
  upvotedFeedbackIds: Record<string, boolean>;
}

const initialState: UserState = {
  isUserLoggedIn: false,
  profileInfo: {
    name: "",
    image: "",
    username: "",
  },
  upvotedFeedbackIds: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredentials(state, action: PayloadAction<LoggedinUserProfile>) {
      //payload = user account information (see initalState object for data structure)
      state.isUserLoggedIn = true;
      state.profileInfo = action.payload;
    },
    trackUserUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      state.upvotedFeedbackIds[action.payload] = true;
    },
    untrackUserUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      delete state.upvotedFeedbackIds[action.payload];
    },
  },
});

export const { setUserCredentials, trackUserUpvote, untrackUserUpvote } =
  userSlice.actions;

export default userSlice.reducer;

// Redux Selectors
export const getIsFeedbackUpvoted =
  (feedbackId: string) => (state: AppState) => {
    return !!state.user.upvotedFeedbackIds[feedbackId];
  };

export const getLoggedInUser = (state: AppState) => state.user;
