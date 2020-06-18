import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads, enums, Members, PlayerRoles } from "@colobobo/library";

export interface RoundState {
  id: number;
  isStarted: boolean;
  duration: number;
  world: enums.World;
  tick: number;
  members: Members;
  playersRole: PlayerRoles;
  score: number;
  lives: number;
  isSuccess: boolean;
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
      const {
        id,
        duration,
        world,
        tick,
        members,
        lives,
        playerRoles
      } = action.payload.data;
      state.id = id;
      state.duration = duration;
      state.world = world;
      state.tick = tick;
      state.members = members;
      state.playersRole = playerRoles;
      state.lives = lives;
    },
    start: (state: RoundState, action: PayloadAction<payloads.round.Start>) => {
      state.isStarted = true;
    },
    stop: (state: RoundState) => {
      state.isStarted = false;
    },
    fail: (state: RoundState, action: PayloadAction<payloads.round.Fail>) => {
      state.lives = action.payload.data.lives;
      state.isSuccess = false;
      state.isStarted = false;
    },
    success: (
      state: RoundState,
      action: PayloadAction<payloads.round.Success>
    ) => {
      state.score = action.payload.data.score;
      state.isSuccess = true;
      state.isStarted = false;
    },
    tick: (state: RoundState, action: PayloadAction<payloads.round.Tick>) => {
      state.members = action.payload.data.members;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.round;
const selectIsStarted = (state: RootState) => getRoot(state).isStarted;
const selectId = (state: RootState) => getRoot(state).id;
const selectDuration = (state: RootState) => getRoot(state).duration;
const selectWorld = (state: RootState) => getRoot(state).world;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectLives = (state: RootState) => getRoot(state).lives;
const selectScore = (state: RootState) => getRoot(state).score;
const selectIsSuccess = (state: RootState) => getRoot(state).isSuccess;
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
const selectPlayersRole = (state: RootState) => getRoot(state).playersRole;

export const selectors = {
  selectTick,
  selectId,
  selectIsStarted,
  selectDuration,
  selectWorld,
  selectMember,
  selectMembers,
  selectLives,
  selectScore,
  selectIsSuccess,
  selectMembersAsArray,
  selectMembersWaiting,
  selectMembersActive,
  selectMembersArrived,
  selectPlayersRole
};

// reducer / actions
export const { reducer, actions } = slice;
