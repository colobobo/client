import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PayloadsRoom } from "fast-not-fat";

export interface RoomState {
  id: string | null;
  error: number | null;
  code: number | null;
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
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.room;
const selectId = (state: RootState) => getRoot(state).id;
const selectError = (state: RootState) => getRoot(state).error;
const selectCode = (state: RootState) => getRoot(state).code;
export const selectors = {
  selectId,
  selectError,
  selectCode
};

// reducer / actions
export const { reducer, actions } = slice;
