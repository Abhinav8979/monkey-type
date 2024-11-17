import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOptions: {
    group1: null,
    group2: "timer",
    time: 15,
  },
};

const practiceSlice = createSlice({
  name: "practice",
  initialState,
  reducers: {
    setSelectedOption: (state, action) => {
      state.selectedOptions = action.payload;
    },
  },
});

export const { setSelectedOption } = practiceSlice.actions;

export default practiceSlice.reducer;
