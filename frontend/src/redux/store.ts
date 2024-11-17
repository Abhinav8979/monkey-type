import { configureStore } from "@reduxjs/toolkit";
import practiceReducer from "./features/practiceSlice";

export const practiceStore = configureStore({
  reducer: {
    practice: practiceReducer,
  },
});

export type PracticeState = ReturnType<typeof practiceStore.getState>;
export type PracticeDispatch = typeof practiceStore.dispatch;

export type AppDispatch = PracticeState["practice"];
