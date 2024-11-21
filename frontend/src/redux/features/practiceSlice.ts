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
  correctWordsTyped: 0,
  incorrectWordsTyped: 0,
  extraWordsTyped: 0,
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOptions = action.payload;
      console.log(state.selectedOptions);
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
      if (action.payload.correct) {
        state.correctWordsTyped = action.payload.correct;
      }
      if (action.payload.incorrect) {
        state.incorrectWordsTyped = action.payload.incorrect;
      }
      if (action.payload.extra) {
        state.extraWordsTyped = action.payload.extra;
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
