import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { enums, payloads } from "@colobobo/library";

export interface GameState {
  isStarted: boolean;
  sceneType: enums.scene.Type | null;
  score: number;
  life: number;
  disposition: enums.game.Disposition;
}

export const slice = createSlice({
  name: "game",
  initialState: {
    isStarted: false,
    sceneType: null,
    disposition: enums.game.Disposition.line
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
    },
    dispositionValidated: (
      state: GameState,
      action: PayloadAction<payloads.game.DispositionValidated>
    ) => {
      const { disposition } = action.payload.data;
      state.disposition = disposition;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.game;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectSceneType = (state: RootState) => getRoot(state).sceneType;
const selectScore = (state: RootState) => getRoot(state).score;
const selectLife = (state: RootState) => getRoot(state).life;
const selectDisposition = (state: RootState) => getRoot(state).disposition;

export const selectors = {
  selectIsStarted,
  selectSceneType,
  selectScore,
  selectLife,
  selectDisposition
};

// reducer / actions
export const { reducer, actions } = slice;
