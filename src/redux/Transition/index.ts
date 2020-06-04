import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "@colobobo/library";

export interface TransitionState {
  isStarted: boolean;
}

export const slice = createSlice({
  name: "transition",
  initialState: {
    isStarted: false
  } as TransitionState,
  reducers: {
    init: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.Init>
    ) => {},
    start: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.Start>
    ) => {
      state.isStarted = true;
    },
    stop: state => {
      state.isStarted = false;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.transition;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;

export const selectors = {
  selectIsStarted
};

// reducer / actions
export const { reducer, actions } = slice;
