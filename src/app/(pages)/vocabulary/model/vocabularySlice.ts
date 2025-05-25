import { createSlice } from '@reduxjs/toolkit';

export enum VocabularyType {
  WORDS = 'words',
  PHRASES = 'phrases',
}

export const LOCAL_STORAGE_ACTIVE_VOCABULARY_KEY = 'ACTIVE_VOCABULARY';

const initialState = {
  activeVocabulary: VocabularyType.WORDS,
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {},
});
