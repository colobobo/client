import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "@colobobo/library";

export interface RoomState {
  id: string | null;
  error: number | null;
  deviceId: string;
  isCreator: boolean;
}

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null,
    deviceId: "",
    isCreator: false
  } as RoomState,
  reducers: {
    createSuccess: (
      state: RoomState,
      action: PayloadAction<payloads.room.CreateSuccess>
    ) => {
      const { id, deviceId } = action.payload.data;
      state.id = id;
      state.deviceId = deviceId;
      state.isCreator = true;
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
      const { id, deviceId, isCreator } = action.payload.data;
      state.id = id;
      state.deviceId = deviceId;
      state.isCreator = isCreator;
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
const selectDeviceId = (state: RootState) => getRoot(state).deviceId;
const selectIsCreator = (state: RootState) => getRoot(state).isCreator;
export const selectors = {
  selectId,
  selectError,
  selectDeviceId,
  selectIsCreator
};

// reducer / actions
export const { reducer, actions } = slice;
