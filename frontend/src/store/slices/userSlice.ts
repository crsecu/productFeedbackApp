import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

import { CurrentUser, UserProfile } from "../../types/user.types";

interface UserState {
  isUserLoggedIn: boolean;
  authId: string;
  profileInfo: CurrentUser;
  upvotedFeedbackIds: Record<string, boolean>;
}

const initialState: UserState = {
  isUserLoggedIn: false,
  authId: "",
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
    setUserCredentials(state, action: PayloadAction<Omit<UserProfile, "id">>) {
      //payload = user account information (see initalState object for data structure)
      state.isUserLoggedIn = true;
      const { authId, ...userProfileData } = action.payload;
      state.authId = authId;
      state.profileInfo = userProfileData;
    },
    trackUserUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      state.upvotedFeedbackIds[action.payload] = true;
    },
    untrackUserUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      delete state.upvotedFeedbackIds[action.payload];
    },
    logUserOut(state) {
      state.isUserLoggedIn = false;
      state.profileInfo = {
        name: "",
        image: "",
        username: "",
      };

      state.upvotedFeedbackIds = {};
    },
  },
});

export const {
  setUserCredentials,
  trackUserUpvote,
  untrackUserUpvote,
  logUserOut,
} = userSlice.actions;

export default userSlice.reducer;

// Redux Selectors
export const getIsFeedbackUpvoted =
  (feedbackId: string) => (state: AppState) => {
    return !!state.user.upvotedFeedbackIds[feedbackId];
  };

export const getLoggedInUser = (state: AppState) => state.user;
