import {
  configureStore,
  getDefaultMiddleware,
  combineReducers
} from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";
import { reducers } from ".";
import socketMiddleware from "./WebSocket/socketMiddleware";

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;

export const getStore = (id: string) =>
  configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware<RootState>(),
      socketMiddleware()
    ] as const,
    devTools: {
      name: `colobobo${id && `-${id}`}`
    }
  });
