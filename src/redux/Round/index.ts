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
      const { id, duration, world, tick, members } = action.payload.data;
      state.id = id;
      state.duration = duration;
      state.world = world;
      state.tick = tick;
      state.members = members;
      // TODO: playerRoles
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
const selectTick = (state: RootState) => getRoot(state).tick;
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
  selectMember,
  selectMembers,
  selectMembersAsArray,
  selectMembersWaiting,
  selectMembersActive,
  selectMembersArrived
};

// reducer / actions
export const { reducer, actions } = slice;
