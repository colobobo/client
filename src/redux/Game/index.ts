import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { enums, payloads } from "@colobobo/library";

export interface GameState {
  isStarted: boolean;
  isEnded: boolean;
  sceneType: enums.scene.Type | null;
  disposition: enums.game.Disposition;
  lives: number;
  score: number;
  hasPreamble: boolean;
  isOver: boolean;
}

export const slice = createSlice({
  name: "game",
  initialState: {
    isStarted: false,
    hasPreamble: false,
    isOver: false,
    sceneType: null,
    disposition: enums.game.Disposition.line,
    lives: 0
  } as GameState,
  reducers: {
    startSuccess: (
      state: GameState,
      action: PayloadAction<payloads.game.StartSuccess>
    ) => {
      const { lives } = action.payload.data;
      state.lives = lives;
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
    },
    end: (state: GameState, action: PayloadAction<payloads.game.End>) => {
      state.isStarted = false;
      state.isEnded = true;
    },
    preambleUpdate: (state: GameState) => {
      state.hasPreamble = true;
    },
    roundEnd: (state: GameState, action: PayloadAction<payloads.round.End>) => {
      const { lives, gameScore } = action.payload.data;
      state.isOver = lives === 0;
      state.score = gameScore;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.game;
const selectLives = (state: RootState) => getRoot(state).lives;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectIsEnded = (state: RootState) => getRoot(state).isEnded;
const selectSceneType = (state: RootState) => getRoot(state).sceneType;
const selectDisposition = (state: RootState) => getRoot(state).disposition;
const selectScore = (state: RootState) => getRoot(state).score;
const selectHasPreamble = (state: RootState) => getRoot(state).hasPreamble;
const selectIsOver = (state: RootState) => getRoot(state).isOver;

export const selectors = {
  selectIsStarted,
  selectIsEnded,
  selectSceneType,
  selectDisposition,
  selectLives,
  selectScore,
  selectHasPreamble,
  selectIsOver
};

// reducer / actions
export const { reducer, actions } = slice;
