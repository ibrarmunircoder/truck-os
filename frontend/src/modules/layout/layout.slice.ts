import { createSlice } from '@reduxjs/toolkit';

export interface LayoutStateInterface {
  sidebarOpen;
}

const initialState: LayoutStateInterface = {
  sidebarOpen: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export default layoutSlice.reducer;
export const { openSidebar, closeSidebar } = layoutSlice.actions;
