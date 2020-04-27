import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PayloadsGame } from "fast-not-fat";

export interface GameState {
  position: {
    x: number;
    y: number;
  };
  isStarted: boolean;
}

export const slice = createSlice({
  name: "game",
  initialState: {
    isStarted: false
  } as GameState,
  reducers: {
    tick: (state: GameState, action: PayloadAction<PayloadsGame.Tick>) => {
      state.position.x = action.payload.data.x;
      state.position.y = action.payload.data.y;
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
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
export const selectors = {
  selectPosition,
  selectIsStarted
};

// reducer / actions
export const { reducer, actions } = slice;
