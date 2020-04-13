import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface DeviceState {
  screenSize: {
    width: number;
    height: number;
  };
  position: number;
}

export const slice = createSlice({
  name: "device",
  initialState: {
    screenSize: {
      width: window.innerWidth,
      height: window.innerHeight
    },
    position: 0
  } as DeviceState,
  reducers: {
    addScreenSize: (
      state: DeviceState,
      action: PayloadAction<{ width: number; height: number }>
    ) => {
      state.screenSize.width = action.payload.width;
      state.screenSize.height = action.payload.height;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.device;
const selectScreenSize = (state: RootState) => getRoot(state).screenSize;
export const selectors = {
  selectScreenSize
};

// reducer / actions
export const { reducer, actions } = slice;
