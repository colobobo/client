import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PayloadsRoom } from "fast-not-fat";

export interface RoomState {
  id: string | null;
  error: number | null;
  code: number | null;
  players: Player[];
}

export interface Player {
  id: string | null;
  position?: number | null;
  deviceSize: {
    width: number | null;
    height: number | null;
  };
}

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null,
    code: null
  } as RoomState,
  reducers: {
    createSuccess: (
      state: RoomState,
      action: PayloadAction<PayloadsRoom.CreateSuccess>
    ) => {
      state.id = action.payload.data.id;
    },
    createError: (
      state: RoomState,
      action: PayloadAction<PayloadsRoom.CreateError>
    ) => {
      state.error = action.payload.code;
    },
    joinSuccess: (
      state: RoomState,
      action: PayloadAction<PayloadsRoom.JoinSuccess>
    ) => {
      state.id = action.payload.data.id;
    },
    joinError: (
      state: RoomState,
      action: PayloadAction<PayloadsRoom.JoinError>
    ) => {
      state.code = action.payload.code;
    },
    addPlayer: (
      state: RoomState,
      action: PayloadAction<{ amount: number }>
    ) => {
      console.log("add player");
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.room;
const selectId = (state: RootState) => getRoot(state).id;
const selectError = (state: RootState) => getRoot(state).error;
const selectCode = (state: RootState) => getRoot(state).code;
const selectPlayers = (state: RootState) => getRoot(state).players;
export const selectors = {
  selectId,
  selectError,
  selectCode,
  selectPlayers
};

// reducer / actions
export const { reducer, actions } = slice;
