import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./Counter";
import socketMiddleware from "./socketMiddleware";

export default configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: [...getDefaultMiddleware(), socketMiddleware()]
});
