import {
  configureStore,
  getDefaultMiddleware,
  combineReducers
} from "@reduxjs/toolkit";
import { useSelector, TypedUseSelectorHook } from "react-redux";

import { reducer as adminReducer } from "./Admin";
import { reducer as areaReducer } from "./Area";
import { reducer as counterReducer } from "./Counter";
import { reducer as roomReducer } from "./Room";
import { reducer as deviceReducer } from "./Device";
import { reducer as gameReducer } from "./Game";
import socketMiddleware from "./WebSocket/socketMiddleware";

const rootReducer = combineReducers({
  admin: adminReducer,
  area: areaReducer,
  counter: counterReducer,
  room: roomReducer,
  device: deviceReducer,
  game: gameReducer
});

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
      name: `fnf${id && `-${id}`}`
    }
  });
