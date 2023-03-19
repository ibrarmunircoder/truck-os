import { createTheme, responsiveFontSizes, Theme } from '@mui/material/styles';
import { baseThemeConfig } from 'configuration/theme/roqone/base';
import { darkThemeConfig } from 'configuration/theme/roqone/dark';
import { lightThemeConfig } from 'configuration/theme/roqone/light';
import deepmerge from 'deepmerge';
declare module '@mui/styles/defaultTheme' {
  interface DefaultTheme extends Theme { }
}

export const lightTheme = responsiveFontSizes(
  createTheme(
    deepmerge(baseThemeConfig, lightThemeConfig)
  )
);

export const darkTheme = responsiveFontSizes(
  createTheme(
    deepmerge(baseThemeConfig, darkThemeConfig)
  )
);
