import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "@colobobo/library";

export interface TransitionState {}

export const slice = createSlice({
  name: "transition",
  initialState: {} as TransitionState,
  reducers: {
    init: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.Init>
    ) => {},
    start: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.Start>
    ) => {}
  }
});

// Selectors

const getRoot = (state: RootState) => state.transition;

export const selectors = {};

// reducer / actions
export const { reducer, actions } = slice;
