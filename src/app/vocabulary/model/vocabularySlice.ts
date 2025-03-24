import { createSlice } from '@reduxjs/toolkit';

export type ActiveVocabulary = 'words' | 'phrases';

interface IVocabularyState {
  activeVocabulary: ActiveVocabulary;
}

const initialState: IVocabularyState = {
  activeVocabulary: 'words',
};

const vocabularySlice = createSlice({
  name: 'vocabulary',
  initialState,
  reducers: {
    setActiveVocabulary: (state, action) => {
      state.activeVocabulary = action.payload;
    },
  },
});

export default vocabularySlice.reducer;
export const { setActiveVocabulary } = vocabularySlice.actions;
export const selectActiveVocabulary = (state: any): ActiveVocabulary =>
  state.vocabulary.activeVocabulary;
