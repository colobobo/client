import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "@colobobo/library";

export interface TransitionState {
  isStarted: boolean;
  isNext: boolean;
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
      state.isNext = false;
    },
    nextSuccess: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.NextSuccess>
    ) => {
      state.isNext = true;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.transition;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectIsNext = (state: RootState) => getRoot(state).isNext;

export const selectors = {
  selectIsStarted,
  selectIsNext
};

// reducer / actions
export const { reducer, actions } = slice;
