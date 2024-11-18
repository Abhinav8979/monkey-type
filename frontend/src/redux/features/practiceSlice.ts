import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOptions: {
    group1: null,
    group2: "timer",
    time: 15,
  },
  startPracticeGame: false,
  showPracticeGameResult: false,
  totalWords: 0,
  noOfWordsTyped: 0,
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOptions = action.payload;
    },
    setPracticeGameStart: (state, action) => {
      state.startPracticeGame = action.payload;
    },
    setPracticeGameResult: (state, action) => {
      state.showPracticeGameResult = action.payload;
    },
    setWordsSummary: (state, action) => {
      if (action.payload.totalWords) {
        state.totalWords = action.payload.totalWords;
      }
      if (action.payload.noOfWordsTyped) {
        state.noOfWordsTyped = action.payload.noOfWordsTyped;
      }
    },
  },
});

export const {
  setSelectedOption,
  setPracticeGameStart,
  setPracticeGameResult,
  setWordsSummary,
} = practiceSlice.actions;

export default practiceSlice.reducer;
