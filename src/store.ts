import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./features/feedback/feedbackSlice";
import userReducer from "./features/user/userSlice";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
    user: userReducer,
  },
});

// Get the type of store variable
export type AppStore = typeof store;
// Infer the `RootState` type from the store itself
export type AppState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
