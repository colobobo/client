import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads, enums, round } from "@colobobo/library";

export interface TransitionState {
  isStarted: boolean;
  isNext: boolean;
  roundWorld: enums.World;
  roundLives: number;
  isRoundSuccess: boolean;
  isRoundFail: boolean;
  roundFailCause: enums.round.FailCauses | null;
  roundScoreDetails: round.ScoreDetails;
}

export const slice = createSlice({
  name: "transition",
  initialState: {
    isStarted: false
  } as TransitionState,
  reducers: {
    init: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.Init>
    ) => {},
    start: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.Start>
    ) => {
      state.isStarted = true;
    },
    stop: state => {
      state.isStarted = false;
      state.isNext = false;
    },
    nextSuccess: (
      state: TransitionState,
      action: PayloadAction<payloads.transition.NextSuccess>
    ) => {
      state.isNext = true;
    },
    roundEnd: (
      state: TransitionState,
      action: PayloadAction<payloads.round.End>
    ) => {
      const {
        lives,
        endType,
        failCause,
        roundScore,
        world
      } = action.payload.data;
      state.roundWorld = world;
      state.roundLives = lives;
      state.roundFailCause = failCause;
      state.roundScoreDetails = roundScore;
      state.isRoundSuccess = endType === enums.round.EndType.success;
      state.isRoundFail = endType === enums.round.EndType.fail;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.transition;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectIsNext = (state: RootState) => getRoot(state).isNext;
const selectRoundWorld = (state: RootState) => getRoot(state).roundWorld;
const selectRoundLives = (state: RootState) => getRoot(state).roundLives;
const selectRoundFailCause = (state: RootState) =>
  getRoot(state).roundFailCause;
const selectRoundScoreDetails = (state: RootState) =>
  getRoot(state).roundScoreDetails;
const selectIsRoundSuccess = (state: RootState) =>
  getRoot(state).isRoundSuccess;
const selectIsRoundFail = (state: RootState) => getRoot(state).isRoundFail;

export const selectors = {
  selectIsStarted,
  selectRoundWorld,
  selectRoundLives,
  selectRoundFailCause,
  selectRoundScoreDetails,
  selectIsRoundSuccess,
  selectIsRoundFail,
  selectIsNext
};

// reducer / actions
export const { reducer, actions } = slice;
