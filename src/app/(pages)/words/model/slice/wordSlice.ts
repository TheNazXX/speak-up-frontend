import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IWord } from '../types/word.types';

export interface WordState extends IWord {}

const initialState = null;

export const HeaderSlice = createSlice({
  name: 'word',
  initialState,
  reducers: {},
});
