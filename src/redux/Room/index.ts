import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
// @ts-ignore
import { PayloadsRoom } from "@types/fast-not-fat";

export interface RoomState {
  id: string | null;
  error: number | null;
}

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null
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
    ) => {},
    joinError: (
      state: RoomState,
      action: PayloadAction<PayloadsRoom.JoinError>
    ) => {}
  }
});

// Selectors

const getRoot = (state: RootState) => state.room;
const selectId = (state: RootState) => getRoot(state).id;
const selectError = (state: RootState) => getRoot(state).error;
export const selectors = {
  selectId,
  selectError
};

// reducer / actions
export const { reducer, actions } = slice;
