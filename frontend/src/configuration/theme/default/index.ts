import { createTheme, responsiveFontSizes } from '@mui/material/styles';

export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'light',
    },
  })
);

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: {
      mode: 'dark',
    },
  })
);
