import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOptions: {
    group1: null,
    group2: "timer",
    time: 15,
  },
  startGame: false,
  showGameResult: false,
};

const commonSlice = createSlice({
  name: "sphere",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOptions = action.payload;
    },
    setGameStart: (state, action) => {
      state.startGame = action.payload;
    },
    setGameResult: (state, action) => {
      state.showGameResult = action.payload;
    },
  },
});

export const { setSelectedOption, setGameResult, setGameStart } =
  commonSlice.actions;

export default commonSlice.reducer;
