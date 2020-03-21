import {
  configureStore,
  getDefaultMiddleware,
  combineReducers
} from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./Counter";
import socketMiddleware from "./WebSocket/socketMiddleware";

const rootReducer = combineReducers({
  counter: counterReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware<RootState>(),
    socketMiddleware()
  ] as const,
  devTools: {
    name: "fast-not-fat"
  }
});

export type AppDispatch = typeof store.dispatch;

export default store;
