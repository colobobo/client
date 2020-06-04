import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { enums, payloads } from "@colobobo/library";

export interface GameState {
  isStarted: boolean;
  sceneType: enums.scene.Type | null;
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

export const selectors = {
  selectIsStarted,
  selectSceneType
};

// reducer / actions
export const { reducer, actions } = slice;
