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
  score: number;
  lives: number;
}

export const slice = createSlice({
  name: "round",
  initialState: {
    isStarted: false,
    members: {},
    score: 0
  } as RoundState,
  reducers: {
    init: (state: RoundState, action: PayloadAction<payloads.round.Init>) => {
      const { id, duration, world, tick, members, lives } = action.payload.data;
      state.id = id;
      state.duration = duration;
      state.world = world;
      state.tick = tick;
      state.members = members;
      state.lives = lives;
      // TODO: playerRoles
    },
    start: (state: RoundState, action: PayloadAction<payloads.round.Start>) => {
      state.isStarted = true;
    },
    stop: (state: RoundState) => {
      state.isStarted = false;
    },
    fail: (state: RoundState, action: PayloadAction<payloads.round.Fail>) => {
      state.lives = action.payload.data.lives;
    },
    success: (
      state: RoundState,
      action: PayloadAction<payloads.round.Success>
    ) => {
      state.score = action.payload.data.score;
    },
    tick: (state: RoundState, action: PayloadAction<payloads.round.Tick>) => {
      state.members = action.payload.data.members;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.round;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectDuration = (state: RootState) => getRoot(state).duration;
const selectWorld = (state: RootState) => getRoot(state).world;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectLives = (state: RootState) => getRoot(state).lives;
const selectScore = (state: RootState) => getRoot(state).score;
const selectMember = (state: RootState, { id }: { id: string }) =>
  getRoot(state).members[id];
const selectMembers = (state: RootState) => getRoot(state).members;
const selectMembersAsArray = createSelector(selectMembers, objects =>
  Object.keys(objects).map(objectId => ({ ...objects[objectId], id: objectId }))
);
const selectMembersWaiting = createSelector(selectMembersAsArray, members =>
  members.filter(member => member.status === enums.member.Status.waiting)
);
const selectMembersActive = createSelector(selectMembersAsArray, members =>
  members.filter(member => member.status === enums.member.Status.active)
);
const selectMembersArrived = createSelector(selectMembersAsArray, members =>
  members.filter(member => member.status === enums.member.Status.arrived)
);

export const selectors = {
  selectTick,
  selectIsStarted,
  selectDuration,
  selectWorld,
  selectMember,
  selectMembers,
  selectLives,
  selectScore,
  selectMembersAsArray,
  selectMembersWaiting,
  selectMembersActive,
  selectMembersArrived
};

// reducer / actions
export const { reducer, actions } = slice;
