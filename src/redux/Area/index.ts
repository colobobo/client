import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { AreaDevice, payloads } from "@colobobo/library";

export interface AreaState {
  width: number;
  minHeight: number;
  maxHeight: number;
  devices: {
    [deviceId: string]: AreaDevice;
  };
}

export const slice = createSlice({
  name: "area",
  initialState: {
    width: 0,
    minHeight: 0,
    maxHeight: 0,
    devices: {}
  } as AreaState,
  reducers: {
    update: (state: AreaState, action: PayloadAction<payloads.area.Update>) => {
      const { width, minHeight, maxHeight, devices } = action.payload.data;
      state.width = width;
      state.minHeight = minHeight;
      state.maxHeight = maxHeight;
      state.devices = devices;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.area;
const selectWidth = (state: RootState) => getRoot(state).width;
const selectMinHeight = (state: RootState) => getRoot(state).minHeight;
const selectMaxHeight = (state: RootState) => getRoot(state).maxHeight;
const selectDevices = (state: RootState) => getRoot(state).devices;
const selectDevicesArray = createSelector([selectDevices], devices => {
  return Object.keys(devices).map(deviceId => ({
    id: deviceId,
    ...devices[deviceId]
  }));
});
const selectDevice = (state: RootState, { id }: { id: string }) =>
  getRoot(state).devices[id];

export const selectors = {
  selectWidth,
  selectMinHeight,
  selectMaxHeight,
  selectDevices,
  selectDevicesArray,
  selectDevice
};

// reducer / actions
export const { reducer, actions } = slice;
