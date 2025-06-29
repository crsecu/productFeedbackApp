import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, AppState } from "../store/store";

// Use throughout the app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<AppState>();
export const useAppStore = useStore.withTypes<AppStore>();
