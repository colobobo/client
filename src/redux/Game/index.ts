import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { PayloadsGame } from "fast-not-fat";

export interface GameState {
  position: {
    x: number;
    y: number;
  };
}

export const slice = createSlice({
  name: "game",
  initialState: {} as GameState,
  reducers: {
    tick: (state: GameState, action: PayloadAction<PayloadsGame.Tick>) => {
      state.position.x = action.payload.data.x;
      state.position.y = action.payload.data.y;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.game;
const selectPosition = (state: RootState) => getRoot(state).position;
export const selectors = {
  selectPosition
};

// reducer / actions
export const { reducer, actions } = slice;
