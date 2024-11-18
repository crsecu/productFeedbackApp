import { createSlice } from "@reduxjs/toolkit";
import { User } from "./user.types";

const initialState: User = {
  name: "Test",
  username: "test123",
  image: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
});

export default userSlice.reducer;

//TO DO:
//define reducers
//export reducers
