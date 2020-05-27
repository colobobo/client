import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads, GameObjects } from "@colobobo/library";

export interface RoundState {
  tick: number;
  objects: GameObjects;
}

export const slice = createSlice({
  name: "round",
  initialState: {
    objects: {}
  } as RoundState,
  reducers: {
    tick: (state: RoundState, action: PayloadAction<payloads.round.Tick>) => {
      state.objects = action.payload.data.objects;
      state.tick = action.payload.data.tick;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.round;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectObject = (state: RootState, { id }: { id: string }) =>
  getRoot(state).objects[id];
const selectObjects = (state: RootState) => getRoot(state).objects;
const selectObjectsAsArray = createSelector(selectObjects, objects =>
  Object.keys(objects).map(objectId => ({ ...objects[objectId], id: objectId }))
);

export const selectors = {
  selectTick,
  selectObject,
  selectObjectsAsArray
};

// reducer / actions
export const { reducer, actions } = slice;
