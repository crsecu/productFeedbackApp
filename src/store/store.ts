import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./slices/userSlice";

import modalReducer from "./slices/modalSlice";
import toastNotificationReducer from "./slices/toastNotificationSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    modal: modalReducer,
    toastNotification: toastNotificationReducer,
  },
});

// Get the type of store variable
export type AppStore = typeof store;
// Infer the `RootState` type from the store itself
export type AppState = ReturnType<AppStore["getState"]>;
// Infer the `AppDispatch` type from the store itself
export type AppDispatch = AppStore["dispatch"];

export default store;
