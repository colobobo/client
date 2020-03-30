import {
  configureStore,
  getDefaultMiddleware,
  combineReducers
} from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./Counter";
import { reducer as roomReducer } from "./Room";
import socketMiddleware from "./WebSocket/socketMiddleware";

const rootReducer = combineReducers({
  counter: counterReducer,
  room: roomReducer
});

export type RootState = ReturnType<typeof rootReducer>;

export const getStore = (id: string) =>
  configureStore({
    reducer: rootReducer,
    middleware: [
      ...getDefaultMiddleware<RootState>(),
      socketMiddleware()
    ] as const,
    devTools: {
      name: `fnf${id && `-${id}`}`
    }
  });
