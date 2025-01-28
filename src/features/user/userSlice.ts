import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./user.types";
import { AppState } from "../../store";

interface UserState {
  validatedUser: User;
}

const initialState: UserState = {
  // validatedUser: {
  //   id: "",
  //   image: "",
  //   name: "",
  //   username: "",
  //   upvotedFeedbackIds: [],
  // },

  /* Remove later */
  validatedUser: {
    image: "./assets/user-images/image-zena.jpg",
    name: "Cristina",
    username: "cs",
    upvotedFeedbackIds: [],
    id: "fcb5",
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserCredentials(state, action: PayloadAction<User>) {
      //payload = user account information (see initalState object for data structure)
      state.validatedUser = action.payload;
    },
    trackUserUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      state.validatedUser.upvotedFeedbackIds.push(action.payload);
    },
    untrackUserUpvote(state, action: PayloadAction<string>) {
      //payload = feedback id
      state.validatedUser.upvotedFeedbackIds =
        state.validatedUser.upvotedFeedbackIds.filter(
          (id) => id !== action.payload
        );
    },
  },
});

export const { setUserCredentials, trackUserUpvote, untrackUserUpvote } =
  userSlice.actions;

export default userSlice.reducer;

// Redux Selectors
export const getIsFeedbackUpvoted = (feedbackId: string) => (state: AppState) =>
  state.user.validatedUser.upvotedFeedbackIds.some((id) => id === feedbackId);

/* Look into memoization with Reselect before using this selector function */
export const getLoggedInUser = (state: AppState) => {
  const loggedInUser = state.user.validatedUser;
  return {
    name: loggedInUser.name,
    image: loggedInUser.image,
    username: loggedInUser.username,
  };
};
