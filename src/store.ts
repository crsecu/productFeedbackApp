import { configureStore } from "@reduxjs/toolkit";
import feedbackReducer from "./features/feedback/feedbackSlice";

const store = configureStore({
  reducer: {
    feedback: feedbackReducer,
  },
});

// Get the type of store variable
export type AppStore = typeof store;
// Infer the `RootState` type from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
