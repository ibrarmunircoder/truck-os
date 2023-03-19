import {
  PaletteColor,
  PaletteColorOptions
} from '@mui/material/styles/createPalette';

declare module '@mui/material/styles' {
  interface Palette {
    google: PaletteColor;
    linkedin: PaletteColor;
    twitter: PaletteColor;
  }

  interface PaletteOptions {
    google?: PaletteColorOptions;
    linkedin?: PaletteColorOptions;
    twitter?: PaletteColorOptions;
  }

  interface TypeBackground {
    icons: string;
  }

}

declare module '@mui/material/styles/createPalette' {
  interface TypeAction{
    link: string,
  }
}

declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
    xxxl: true;
  }
}
