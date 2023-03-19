import { createSlice } from '@reduxjs/toolkit';
import { ThemeName } from 'modules/theme/types';

export interface ThemeStateInterface {
  name: ThemeName | null;
}

const initialState: ThemeStateInterface = {
  name: 'light',
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    switchThemeAction: (state, action) => {
      state.name = action.payload;
    },
  },
});

export default themeSlice.reducer;

export const { switchThemeAction } = themeSlice.actions;
