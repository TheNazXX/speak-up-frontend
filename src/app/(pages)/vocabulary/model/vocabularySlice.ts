import { createSlice } from '@reduxjs/toolkit';

export enum VocabularyTypes {
  WORDS = 'words',
  PHRASES = 'phrases',
}

export const LOCAL_STORAGE_ACTIVE_VOCABULARY_KEY = 'ACTIVE_VOCABULARY_PAGE';

const initialState = {
  activeVocabulary: VocabularyTypes.WORDS,
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {},
});
