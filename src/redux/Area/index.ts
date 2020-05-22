import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { AreaDevice, payloads } from "@colobobo/library";

export interface AreaState {
  width: number;
  height: number;
  devices: {
    [deviceId: string]: AreaDevice;
  };
}

export const slice = createSlice({
  name: "area",
  initialState: {
    width: 0,
    height: 0,
    devices: {}
  } as AreaState,
  reducers: {
    update: (state: AreaState, action: PayloadAction<payloads.area.Update>) => {
      const { width, height, devices } = action.payload.data;
      state.width = width;
      state.height = height;
      state.devices = devices;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.area;
const selectWidth = (state: RootState) => getRoot(state).width;
const selectHeight = (state: RootState) => getRoot(state).height;
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
  selectHeight,
  selectDevices,
  selectDevicesArray,
  selectDevice
};

// reducer / actions
export const { reducer, actions } = slice;
