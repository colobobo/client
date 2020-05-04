import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PayloadsRoom } from "fast-not-fat";

export interface RoomState {
  id: string | null;
  error: number | null;
  code: number | null;
  deviceId: string;
}

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null,
    code: null,
    deviceId: ""
  } as RoomState,
  reducers: {
    createSuccess: (
      state: RoomState,
      action: PayloadAction<PayloadsRoom.CreateSuccess>
    ) => {
      const { id, deviceId } = action.payload.data;
      state.id = id;
      state.deviceId = deviceId;
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
      const { id, deviceId } = action.payload.data;
      state.id = id;
      state.deviceId = deviceId;
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
const selectDeviceId = (state: RootState) => getRoot(state).deviceId;
export const selectors = {
  selectId,
  selectError,
  selectCode,
  selectDeviceId
};

// reducer / actions
export const { reducer, actions } = slice;
