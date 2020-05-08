import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "fast-not-fat";

export interface GameState {
  isStarted: boolean;
  tick: number;
  objects: { [id: string]: { x: number; y: number } };
}

export const slice = createSlice({
  name: "game",
  initialState: {
    isStarted: false,
    objects: {}
  } as GameState,
  reducers: {
    tick: (state: GameState, action: PayloadAction<payloads.game.Tick>) => {
      state.objects = action.payload.data.objects;
      state.tick = action.payload.data.tick;
    },
    startSuccess: (state: GameState, action) => {
      state.isStarted = true;
    },
    startError: (state: GameState, action) => {
      console.log("game start error");
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.game;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectObject = (state: RootState, { id }: { id: string }) =>
  getRoot(state).objects[id];
const selectObjects = (state: RootState) => getRoot(state).objects;
const selectObjectsAsArray = createSelector(selectObjects, objects =>
  Object.keys(objects).map(objectId => ({ ...objects[objectId], id: objectId }))
);

export const selectors = {
  selectIsStarted,
  selectTick,
  selectObject,
  selectObjectsAsArray
};

// reducer / actions
export const { reducer, actions } = slice;
