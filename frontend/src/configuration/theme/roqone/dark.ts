import { PaletteMode } from '@mui/material';
import { blueGrey, pictonBlue } from 'configuration/theme/colors';

export const darkThemeConfig = {
  palette: {
    mode: 'dark' as PaletteMode,
    common: {
      black: '#0F172A',
      white: '#FFFFFF',
    },
    primary: {
      main: '#FFFFFF',
      dark: blueGrey[500],
      contrastText: 'rgba(15, 23, 42, 0.87)',
      '500': '#6200EE',
    },
    secondary: {
      main: '#93C5FD',
      light: '#BFDBFE',
      dark: '#3B82F6',
      contrastText: 'rgba(15, 23, 42, 0.87)',
    },
    error: {
      main: '#F75959',
      light: '#FCA5A5',
      dark: '#DC2626',
      contrastText: '#FFFFFF',
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
      primary: '#FFFFFF',
      secondary: 'rgba(255, 255, 255, 0.7)',
      disabled: 'rgba(255, 255, 255, 0.5)',
      icon: 'rgba(255, 255, 255, 0.5)',
    },
    divider: 'rgba(248, 250, 252, 0.12)',
    background: {
      paper: blueGrey[800],
      default: blueGrey[900],
    },
    action: {
      active: '#FFFFFF',
      hover: 'rgba(255, 255, 255, 0.08)',
      hoverOpacity: 0.08,
      selected: 'rgba(255, 255, 255, 0.16)',
      selectedOpacity: 0.16,
      disabled: 'rgba(255, 255, 255, 0.3)',
      disabledBackground: 'rgba(255, 255, 255, 0.12)',
      disabledOpacity: 0.38,
      focus: 'rgba(255, 255, 255, 0.12)',
      focusOpacity: 0.12,
      activatedOpacity: 0.24,
      link: 'rgba(147, 197, 253, 1)',
    },
  },
  // NOTE: Handle Chrome autofill in dark mode
  // https://github.com/mui-org/material-ui/issues/14427#issuecomment-892037339
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
        },
        containedPrimary: {
          backgroundColor: pictonBlue[300],
          color: '#ffffff',
          '&:hover': {
            backgroundColor: pictonBlue[300],
          },
        },
        containedSecondary: {
          backgroundColor: '#ffffff',
          color: `rgba(0, 0, 0, 0.87)`,
          '&:hover': {
            backgroundColor: '#ffffff',
          },
        },
        outlinedPrimary: {
          borderColor: pictonBlue[300],
          color: pictonBlue[300],
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: blueGrey[300],
        },
      },
    },
    MuiFilledInput: {
      styleOverrides: {
        root: {
          backgroundColor: blueGrey[800],
          '&:hover': {
            backgroundColor: blueGrey[800],
          },
          '&.Mui-focused': {
            backgroundColor: blueGrey[800],
          },
        },
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'inherit',
            WebkitTextFillColor: 'inherit',
            caretColor: 'inherit',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: 'inherit',
            WebkitTextFillColor: 'inherit',
            caretColor: 'inherit',
          },
        },
        notchedOutline: {
          borderColor: '#64748B',
        },
      },
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: 'rgba(255, 255, 255, 0.87)',
          borderBottomColor: '#293445',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        elevation8: {
          backgroundColor: blueGrey[700],
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          '&.Mui-selected': {
            backgroundColor: blueGrey[500],
            color: '#FFFFFF',
            '&:hover': {
              backgroundColor: blueGrey[500],
              color: '#FFFFFF',
            },
          },
        },
      },
    },
  },
  typography: {
    h1: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h2: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h3: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h4: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h5: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    h6: {
      fontWeight: 500,
      color: '#FFFFFF',
    },
    body1: {
      color: 'rgba(255, 255, 255, 0.5)',
      lineHeight: '32px',
    },
    body2: {
      color: 'rgba(255, 255, 255, 0.5)',
      lineHeight: '32px',
    },
  },
};
