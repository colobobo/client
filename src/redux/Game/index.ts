import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface GameState {
  isStarted: boolean;
}

export const slice = createSlice({
  name: "game",
  initialState: {
    isStarted: false
  } as GameState,
  reducers: {
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

export const selectors = {
  selectIsStarted
};

// reducer / actions
export const { reducer, actions } = slice;
