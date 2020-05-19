import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DeviceState {
  id?: string;
  screenSize: {
    width: number;
    height: number;
  };
  position?: number;
}

export const slice = createSlice({
  name: "device",
  initialState: {
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight
    }
  } as DeviceState,
  reducers: {
    addScreenSize: (
      state: DeviceState,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.screenSize.width = action.payload.width;
      state.screenSize.height = action.payload.height;
    },
    update: (
      state: DeviceState,
      action: PayloadAction<{ id: string; position: number }>
    ) => {
      state.id = action.payload.id;
      state.position = action.payload.position;
    }
  }
});

// selectors
const getRoot = (state: RootState) => state.device;
const selectScreenSize = (state: RootState) => getRoot(state).screenSize;
const selectId = (state: RootState) => getRoot(state).id;
const selectPosition = (state: RootState) => getRoot(state).position;

export const selectors = {
  selectScreenSize,
  selectId,
  selectPosition
};

// reducer / actions
export const { reducer, actions } = slice;
