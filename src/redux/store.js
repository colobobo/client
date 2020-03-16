import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { reducer as counterReducer } from "./Counter";

export default configureStore({
  reducer: {
    counter: counterReducer
  },
  middleware: [...getDefaultMiddleware()]
});
