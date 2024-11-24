import { combineReducers, configureStore } from "@reduxjs/toolkit";
import headerReducer from "./headerSlice/headerSlice";

const reducers = combineReducers({
  headerReducer,
});

export const store = configureStore({
  reducer: reducers,
});
