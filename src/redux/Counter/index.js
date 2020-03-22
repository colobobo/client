import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
    test: {
      a: 1,
      b: {
        c: 2
      }
    }
  },
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload.amount;
    }
  }
});

// Selectors

const getRoot = state => state.counter;
const selectValue = state => getRoot(state).value;
const selectTest = state => getRoot(state).test;

export const selectors = {
  selectValue,
  selectTest
};

// reducer / actions
export const { reducer, actions } = slice;
