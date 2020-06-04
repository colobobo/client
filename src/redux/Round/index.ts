import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads, enums, Members } from "@colobobo/library";

export interface RoundState {
  id: number;
  isStarted: boolean;
  duration: number;
  world: enums.World;
  tick: number;
  members: Members;
}

export const slice = createSlice({
  name: "round",
  initialState: {
    isStarted: false,
    members: {}
  } as RoundState,
  reducers: {
    init: (state: RoundState, action: PayloadAction<payloads.round.Init>) => {
      const { id, duration, world, tick } = action.payload.data;
      state.id = id;
      state.duration = duration;
      state.world = world;
      state.tick = tick;
    },
    start: (state: RoundState, action: PayloadAction<payloads.round.Start>) => {
      state.isStarted = true;
    },
    stop: (state: RoundState) => {
      state.isStarted = false;
    },
    fail: (state: RoundState, action: PayloadAction<payloads.round.Fail>) => {},
    success: (
      state: RoundState,
      action: PayloadAction<payloads.round.Success>
    ) => {},
    tick: (state: RoundState, action: PayloadAction<payloads.round.Tick>) => {
      state.members = action.payload.data.members;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.round;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectDuration = (state: RootState) => getRoot(state).duration;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectMember = (state: RootState, { id }: { id: string }) =>
  getRoot(state).members[id];
const selectMembers = (state: RootState) => getRoot(state).members;
const selectMembersAsArray = createSelector(selectMembers, objects =>
  Object.keys(objects).map(objectId => ({ ...objects[objectId], id: objectId }))
);

export const selectors = {
  selectTick,
  selectIsStarted,
  selectDuration,
  selectMember,
  selectMembers,
  selectMembersAsArray: selectMembersAsArray
};

// reducer / actions
export const { reducer, actions } = slice;
