import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: boolean = false;

export const SidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state: any, action: PayloadAction<boolean>) => {
      state = action.payload;
      return state;
    },
  },
});

export const { toggleSidebar } = SidebarSlice.actions;
export default SidebarSlice.reducer;
export const selectSidebar = (state: any) => state.sidebar;
