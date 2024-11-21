import { configureStore } from "@reduxjs/toolkit";
import practiceReducer from "./features/practiceSlice";
import commonReducer from "./features/commonSlice";
import sphereReducer from "./features/SphereSlice";

export const practiceStore = configureStore({
  reducer: {
    practice: practiceReducer,
    common: commonReducer,
    sphere: sphereReducer,
  },
});

export type PracticeState = ReturnType<typeof practiceStore.getState>;
export type PracticeDispatch = typeof practiceStore.dispatch;

export type AppDispatch = PracticeState["practice"];
