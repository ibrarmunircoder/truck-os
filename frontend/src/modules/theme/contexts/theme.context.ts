import { ThemeName } from 'modules/theme/types';
import React from 'react';

export interface ThemeContextInterface {
  currentThemeName: ThemeName,
  setThemeName: (themeName: ThemeName) => void,
}

export const ThemeContext = React.createContext<ThemeContextInterface>({
  currentThemeName: 'light',
  setThemeName: () => null,
});
