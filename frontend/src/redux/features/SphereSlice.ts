import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  playersResult: [],
  roomId: "",
  sphereGameStart: false,
};

//   player result will contain :
//   totalWords: 0,
//   noOfWordsTyped: 0,
//   correctWordsTyped: 0,
//   incorrectWordsTyped: 0,
//   extraWordsTyped: 0,

const sphereSlice = createSlice({
  name: "sphere",
  initialState,
  reducers: {
    setSphereRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setSphereGameStart: (state, action) => {
      state.sphereGameStart = action.payload;
    },
  },
});

export const { setSphereRoomId, setSphereGameStart } = sphereSlice.actions;

export default sphereSlice.reducer;
