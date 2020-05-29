import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

import { payloads, Members } from "@colobobo/library";

export interface RoundState {
  tick: number;
  members: Members;
}

export const slice = createSlice({
  name: "round",
  initialState: {
    members: {}
  } as RoundState,
  reducers: {
    init: (state: RoundState, action: PayloadAction<payloads.round.Init>) => {},
    start: (
      state: RoundState,
      action: PayloadAction<payloads.round.Start>
    ) => {},
    fail: (state: RoundState, action: PayloadAction<payloads.round.Fail>) => {},
    success: (
      state: RoundState,
      action: PayloadAction<payloads.round.Success>
    ) => {},
    tick: (state: RoundState, action: PayloadAction<payloads.round.Tick>) => {
      state.members = action.payload.data.members;
      state.tick = action.payload.data.tick;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.round;
const selectTick = (state: RootState) => getRoot(state).tick;
const selectMember = (state: RootState, { id }: { id: string }) =>
  getRoot(state).members[id];
const selectMembers = (state: RootState) => getRoot(state).members;
const selectMembersAsArray = createSelector(selectMembers, objects =>
  Object.keys(objects).map(objectId => ({ ...objects[objectId], id: objectId }))
);

export const selectors = {
  selectTick,
  selectMember,
  selectMembers,
  selectMembersAsArray: selectMembersAsArray
};

// reducer / actions
export const { reducer, actions } = slice;
