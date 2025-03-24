import { combineReducers, configureStore } from '@reduxjs/toolkit';
import headerReducer from '../../components/ui/header/model/headerSlice';
import vocabularyReducer from '@/app/vocabulary/model/vocabularySlice';

const reducers = combineReducers({
  header: headerReducer,
  vocabulary: vocabularyReducer,
});

export const store = configureStore({
  reducer: reducers,
});
