import { PaletteMode } from '@mui/material';
import { blueGrey, darkJungleGreen, pictonBlue } from 'configuration/theme/colors';

const colors = {
  yankeesBlue: 'rgba(31, 43, 72, 0.5)',
};

export const lightThemeConfig = {
  palette: {
    mode: 'light' as PaletteMode,
    common: {
      black: darkJungleGreen[900],
      white: '#FFFFFF',
    },
    primary: {
      main: '#65A664',
      light: '#70bc6f',
      contrastText: '#FFFFFF',
      '500': '#6200EE',
    },
    secondary: {
      main: '#1D4ED8',
      light: '#93C5FD',
      dark: '#1E40AF',
      contrastText: '#FFFFFF',
    },
    error: {
      main: '#F75959',
      light: '#FCA5A5',
      dark: '#DC2626',
      contrastText: 'rgba(15, 23, 42, 0.87)',
    },
    warning: {
      main: '#F59E0B',
      light: '#FCD34D',
      dark: '#D97706',
      contrastText: 'rgba(15, 23, 42, 0.87)',
    },
    info: {
      main: '#3B82F6',
      light: '#93C5FD',
      dark: '#2563EB',
      contrastText: 'rgba(15, 23, 42, 0.87)',
    },
    success: {
      main: '#10B981',
      light: '#6EE7B7',
      dark: '#059669',
      contrastText: 'rgba(15, 23, 42, 0.87)',
    },
    grey: blueGrey,
    text: {
      primary: darkJungleGreen[900],
      secondary: colors.yankeesBlue,
      disabled: 'rgba(15, 23, 42, 0.38)',
    },
    divider: 'rgba(15, 23, 42, 0.12)',
    background: {
      paper: '#FFFFFF',
      default: blueGrey[50],
    },
    action: {
      active: 'rgba(15, 23, 42, 0.54)',
      hover: 'rgba(15, 23, 42, 0.04)',
      hoverOpacity: 0.04,
      selected: 'rgba(15, 23, 42, 0.08)',
      selectedOpacity: 0.08,
      disabled: 'rgba(15, 23, 42, 0.26)',
      disabledBackground: 'rgba(15, 23, 42, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(15, 23, 42, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.12,
      link: 'rgba(66, 148, 247, 1)',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
        containedPrimary: {
          backgroundColor: '#65A664',
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#70bc6f',
          },
        },
        containedSecondary: {
          backgroundColor: '#000000',
          opacity: 0.87,
          color: '#ffffff',
          '&:hover': {
            backgroundColor: '#000000',
          },
        },
        outlinedPrimary: {
          borderColor: pictonBlue[300],
          color: pictonBlue[300],
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          '&:after': {
            borderBottom: '1px solid #CBD5E1',
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        standard: {
          '&': {
            color: blueGrey[500],
          },
          '&.Mui-focused': {
            color: blueGrey[500],
          },
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: blueGrey[200],
          '&:hover': {
            backgroundColor: blueGrey[200],
          },
          '&.Mui-focused': {
            backgroundColor: blueGrey[200],
          },
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'rgba(0, 0, 0, 0.87)',
          borderBottomColor: '#EEEEEE',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation8: {
          backgroundColor: '#FFFFFF',
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: '#000000',
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#000000',
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  typography: {
    h1: {
      color: darkJungleGreen[900],
    },
    h2: {
      color: darkJungleGreen[900],
    },
    h3: {
      color: darkJungleGreen[900],
    },
    h4: {
      color: darkJungleGreen[900],
    },
    h5: {
      color: darkJungleGreen[900],
    },
    h6: {
      color: darkJungleGreen[900],
    },
    body1: {
      color: colors.yankeesBlue,
      lineHeight: '32px',
    },
    body2: {
      color: colors.yankeesBlue,
      lineHeight: '32px',
    },
  },
};
