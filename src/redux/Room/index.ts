import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { PayloadSocket } from "fast-not-fat";

export interface RoomState {
  id: number | null;
  error: string | null;
}

type PayloadActionSocket<T> = PayloadAction<PayloadSocket<T>>;

export const slice = createSlice({
  name: "room",
  initialState: {
    id: null,
    error: null
  } as RoomState,
  reducers: {
    createSuccess: (
      state: RoomState,
      action: PayloadActionSocket<{ id: number }>
    ) => {
      state.id = action.payload.data.id;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.room;
const selectId = (state: RootState) => getRoot(state).id;
export const selectors = {
  selectId
};

// reducer / actions
export const { reducer, actions } = slice;
