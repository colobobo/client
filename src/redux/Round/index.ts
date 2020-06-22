import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads, enums, Members, PlayerRoles } from "@colobobo/library";

export interface RoundState {
  id: number;
  isStarted: boolean;
  status: enums.round.Status;
  duration: number;
  endRoundTimeStamp: number;
  world: enums.World;
  tick: number;
  members: Members;
  playersRole: PlayerRoles;
}

export const slice = createSlice({
  name: "round",
  initialState: {
    isStarted: false,
    members: {}
  } as RoundState,
  reducers: {
    init: (state: RoundState, action: PayloadAction<payloads.round.Init>) => {
      const {
        id,
        duration,
        world,
        tick,
        members,
        playerRoles
      } = action.payload.data;
      state.id = id;
      state.status = enums.round.Status.play;
      state.duration = duration;
      state.world = world;
      state.tick = tick;
      state.members = members;
      state.playersRole = playerRoles;
    },
    start: (state: RoundState, action: PayloadAction<payloads.round.Start>) => {
      state.isStarted = true;
      state.endRoundTimeStamp = action.payload.data.endRoundTimeStamp;
    },
    statusUpdateSuccess: (
      state: RoundState,
      action: PayloadAction<payloads.round.StatusUpdateSuccess>
    ) => {
      state.status = action.payload.data.status;
      state.endRoundTimeStamp = action.payload.data.endRoundTimeStamp;
    },
    stop: (state: RoundState) => {
      state.isStarted = false;
    },
    end: (state: RoundState, action: PayloadAction<payloads.round.End>) => {
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
const selectStatus = (state: RootState) => getRoot(state).status;
const selectId = (state: RootState) => getRoot(state).id;
const selectDuration = (state: RootState) => getRoot(state).duration;
const selectEndRoundTimeStamp = (state: RootState) =>
  getRoot(state).endRoundTimeStamp;
const selectWorld = (state: RootState) => getRoot(state).world;
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
const selectPlayersRole = (state: RootState) => getRoot(state).playersRole;

export const selectors = {
  selectTick,
  selectId,
  selectIsStarted,
  selectStatus,
  selectDuration,
  selectEndRoundTimeStamp,
  selectWorld,
  selectMember,
  selectMembers,
  selectMembersAsArray,
  selectMembersWaiting,
  selectMembersActive,
  selectMembersArrived,
  selectPlayersRole
};

// reducer / actions
export const { reducer, actions } = slice;
