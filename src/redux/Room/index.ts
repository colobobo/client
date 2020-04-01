import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PayloadsRoom } from "fast-not-fat";

export interface RoomState {
  id: string | null;
  error: number | null;
  message: string | null;
}

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null,
    message: null
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
      state.error = action.payload.data.code;
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
      //@ts-ignore
      state.message = action.payload.message;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.room;
const selectId = (state: RootState) => getRoot(state).id;
const selectError = (state: RootState) => getRoot(state).error;
const selectMessage = (state: RootState) => getRoot(state).message;
export const selectors = {
  selectId,
  selectError,
  selectMessage
};

// reducer / actions
export const { reducer, actions } = slice;
