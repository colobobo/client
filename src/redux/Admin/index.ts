import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface AdminState {
  status: boolean;
}

export const slice = createSlice({
  name: "admin",
  initialState: {
    status: false
  } as AdminState,
  reducers: {
    activate: (state: AdminState) => {
      state.status = true;
    },
    disable: (state: AdminState) => {
      state.status = false;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.admin;
const selectStatus = (state: RootState) => getRoot(state).status;
export const selectors = {
  selectStatus
};

// reducer / actions
export const { reducer, actions } = slice;
