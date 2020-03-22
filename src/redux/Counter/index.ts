import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface CounterState {
  value: number;
}

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0
  } as CounterState,
  reducers: {
    increment: (state: CounterState) => {
      state.value += 1;
    },
    decrement: (state: CounterState) => {
      state.value -= 1;
    },
    incrementByAmount: (
      state: CounterState,
      action: PayloadAction<{ amount: number }>
    ) => {
      state.value += action.payload.amount;
    }
  }
});

// Selectors

const getRoot = (state: RootState) => state.counter;
const selectValue = (state: RootState) => getRoot(state).value;
export const selectors = {
  selectValue
};

// reducer / actions
export const { reducer, actions } = slice;
