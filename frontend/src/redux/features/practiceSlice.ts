import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOptions: {
    group1: null,
    group2: "timer",
    time: 15,
  },
  startPracticeGame: false,
  showPracticeGameResult: false,
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOptions = action.payload;
    },
    setStartPracticeGame: (state, action) => {
      state.startPracticeGame = action.payload;
    },
    setShowPracticeGame: (state, action) => {
      state.showPracticeGameResult = action.payload;
    },
  },
});

export const { setSelectedOption, setStartPracticeGame, setShowPracticeGame } =
  practiceSlice.actions;

export default practiceSlice.reducer;
