import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PracticeState {
  value: number;
}

const initialState: PracticeState = {
  value: 0,
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    setValue: (state, action: PayloadAction<number>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, decrement, setValue } = practiceSlice.actions;

export default practiceSlice.reducer;
