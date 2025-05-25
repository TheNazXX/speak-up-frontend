import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerReducer from '../../components/ui/header/model/headerSlice';

const reducers = combineReducers({
  header: headerReducer,
});

export const store = configureStore({
  reducer: reducers,
});
