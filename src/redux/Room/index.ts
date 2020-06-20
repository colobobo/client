import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "@colobobo/library";

export interface RoomState {
  id: string | null;
  error: number | null;
  playerId: string;
  isCreator: boolean;
  playersMin: number;
}

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null,
    playerId: "",
    isCreator: false
  } as RoomState,
  reducers: {
    createSuccess: (
      state: RoomState,
      action: PayloadAction<payloads.room.CreateSuccess>
    ) => {
      const { id, playerId, players } = action.payload.data;
      state.id = id;
      state.playerId = playerId;
      state.isCreator = true;
      state.playersMin = players.min;
    },
    createError: (
      state: RoomState,
      action: PayloadAction<payloads.room.CreateError>
    ) => {
      state.error = action.payload.code;
    },
    joinSuccess: (
      state: RoomState,
      action: PayloadAction<payloads.room.JoinSuccess>
    ) => {
      const { id, playerId, isCreator, players } = action.payload.data;
      state.id = id;
      state.playerId = playerId;
      state.isCreator = isCreator;
      state.playersMin = players.min;
    },
    joinError: (
      state: RoomState,
      action: PayloadAction<payloads.room.JoinError>
    ) => {
      state.error = action.payload.code;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.room;
const selectId = (state: RootState) => getRoot(state).id;
const selectError = (state: RootState) => getRoot(state).error;
const selectPlayerId = (state: RootState) => getRoot(state).playerId;
const selectIsCreator = (state: RootState) => getRoot(state).isCreator;
const selectPlayersMin = (state: RootState) => getRoot(state).playersMin;

export const selectors = {
  selectId,
  selectError,
  selectPlayerId,
  selectIsCreator,
  selectPlayersMin
};

// reducer / actions
export const { reducer, actions } = slice;
