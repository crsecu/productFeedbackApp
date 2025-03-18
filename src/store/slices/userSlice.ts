import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../../store/store";
import { User } from "../../features/user/user.types";

interface UserState {
  profileInfo: {
    id: string;
    name: string;
    username: string;
    image: string;
  };
  upvotedFeedbackIds: Record<string, boolean>;
}

const initialState: UserState = {
  // profileInfo: {
  //   id: "",
  //   name: "",
  //   image: "",
  //   username: "",
  // },
  // upvotedFeedbackIds: {},

  /* Remove later */
  profileInfo: {
    id: "fcb5",
    name: "Cristina",
    image: "./assets/user-images/image-zena.jpg",
    username: "cs",
  },
  upvotedFeedbackIds: {},
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredentials(state, action: PayloadAction<User>) {
      //payload = user account information (see initalState object for data structure)
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

export const getLoggedInUser = (state: AppState) => state.user.profileInfo;
