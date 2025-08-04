import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerReducer from '../../components/ui/header/model/headerSlice';
import sidebarReducer from '../../components/ui/sidebar/model/sidebarSlice';

const reducers = combineReducers({
  header: headerReducer,
  sidebar: sidebarReducer,
});

export const store = configureStore({
  reducer: reducers,
});
