import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads } from "fast-not-fat";

export interface GameState {
  position: {
    x: number;
    y: number;
  };
  tick: number;
  isStarted: boolean;
}

export const slice = createSlice({
  name: "game",
  initialState: {
    position: {
      x: 0,
      y: 0
    },
    isStarted: false
  } as GameState,
  reducers: {
    tick: (state: GameState, action: PayloadAction<payloads.game.Tick>) => {
      state.position.x = action.payload.data.x;
      state.position.y = action.payload.data.y;
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
const selectPosition = (state: RootState) => getRoot(state).position;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
export const selectors = {
  selectPosition,
  selectIsStarted,
  selectTick
};

// reducer / actions
export const { reducer, actions } = slice;
