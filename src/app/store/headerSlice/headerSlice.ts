import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export type HeaderPageState =
  | 'default'
  | 'texts'
  | 'words'
  | 'repeat-words'
  | 'phrases';

const initialState: HeaderPageState = 'default';

export const HeaderSlice = createSlice({
  name: 'header',
  initialState,
  reducers: {
    changeHeaderState: (state: any, action: PayloadAction<HeaderPageState>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { changeHeaderState } = HeaderSlice.actions;
export default HeaderSlice.reducer;
