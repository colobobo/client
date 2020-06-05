import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { enums, payloads } from "@colobobo/library";

export interface GameState {
  isStarted: boolean;
  sceneType: enums.scene.Type | null;
  score: number;
  life: number;
}

export const slice = createSlice({
  name: "game",
  initialState: {
    isStarted: false,
    sceneType: null
  } as GameState,
  reducers: {
    startSuccess: (
      state: GameState,
      action: PayloadAction<payloads.game.StartSuccess>
    ) => {
      state.isStarted = true;
    },
    startError: (
      state: GameState,
      action: PayloadAction<payloads.game.StartError>
    ) => {
      console.log("game start error");
    },
    sceneTypeUpdate: (
      state: GameState,
      action: PayloadAction<payloads.game.SceneTypeUpdate>
    ) => {
      const { type } = action.payload.data;
      state.sceneType = type;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.game;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectSceneType = (state: RootState) => getRoot(state).sceneType;
const selectScore = (state: RootState) => getRoot(state).score;
const selectLife = (state: RootState) => getRoot(state).life;

export const selectors = {
  selectIsStarted,
  selectSceneType,
  selectScore,
  selectLife
};

// reducer / actions
export const { reducer, actions } = slice;
