import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user.types";
import { PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  validatedUser: User;
}

const initialState: UserState = {
  validatedUser: {
    id: "",
    image: "",
    name: "",
    username: "",
    upvotedFeedbackIds: [],
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
    addUpvotedFeedbackId(state, action: PayloadAction<string>) {},
  },
});

export const { setUserCredentials } = userSlice.actions;

//define selectors below

export default userSlice.reducer;
