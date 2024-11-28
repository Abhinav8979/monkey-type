import { createSlice } from "@reduxjs/toolkit";
import { message } from "../../types";

const initialState = {
  playersResult: [],
  roomId: "",
  sphereGameStart: false,
  playerData: [],
  playerMessages: [],
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
    setPlayerData: (state, action) => {
      state.playerData = action.payload;
    },
    setPlayerMessage: (state, action) => {
      state.playerMessages = action.payload;
    },
  },
});

export const {
  setSphereRoomId,
  setSphereGameStart,
  setPlayerData,
  setPlayerMessage,
} = sphereSlice.actions;

export default sphereSlice.reducer;
