import {
  useDispatch,
  useSelector,
  useStore,
  TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, PracticeState, PracticeDispatch } from "./store";

// Use these hooks throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<PracticeDispatch>();
export const useAppSelector: TypedUseSelectorHook<PracticeState> = useSelector;
export const useAppStore = () => useStore<AppDispatch>();
