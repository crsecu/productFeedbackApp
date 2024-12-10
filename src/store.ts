import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./features/feedback/feedbackSlice";
import userReducer from "./features/user/userSlice";
import commentReducer from "./features/comments/commentsSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    feedback: feedbackReducer,
    comment: commentReducer,
  },
});

// Get the type of store variable
export type AppStore = typeof store;
// Infer the `RootState` type from the store itself
export type AppState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
