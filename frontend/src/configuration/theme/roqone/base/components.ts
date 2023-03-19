import { pictonBlue } from 'configuration/theme/colors';
import { typography } from 'configuration/theme/roqone/base/typography';

export const components = {
  MuiAvatar: {
    styleOverrides: {
      root: {
        fontSize: '0.875rem',
      },
    },
  },
  MuiButton: {
    defaultProps: {
      size: 'small' as const,
    },
  },
  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
      },
      elevation8: {
        mixBlendMode: 'normal',
        boxShadow: '0px 4px 16px rgba(13, 28, 70, 0.05)',
      },
      rounded: {
        borderRadius: 8,
      },
    },
  },
  MuiFab: {
    defaultProps: {
      size: 'small' as const,
    },
  },
  MuiFilledInput: {
    defaultProps: {
      margin: 'dense' as const,
    },
    styleOverrides: {
      underline: {
        '&:before': {
          borderBottom: 0,
        },
      },
    },
  },
  MuiFormControl: {
    defaultProps: {
      margin: 'normal' as const,
    },
    styleOverrides: {
      marginDense: {
        marginTop: 12,
        marginBottom: 6,
      },
    },
  },
  MuiFormHelperText: {
    defaultProps: {
      margin: 'dense' as const,
    },
  },
  MuiIconButton: {
    defaultProps: {
      size: 'small' as const,
    },
    styleOverrides: {
      sizeSmall: {
        padding: 12,
      },
    },
  },
  // NOTE: Handle Chrome autofill
  // https://github.com/mui-org/material-ui/issues/14427#issuecomment-884102224
  MuiInputBase: {
    defaultProps: {
      margin: 'dense' as const,
    },
    styleOverrides: {
      input: {
        '&:-webkit-autofill': {
          transitionDelay: '9999s',
          transitionProperty: 'background-color, color',
        },
      },
    },
  },
  MuiInputLabel: {
    defaultProps: {
      margin: 'dense' as const,
    },
  },
  MuiLink: {
    defaultProps: {
      underline: 'none' as const,
      color: 'secondary' as const,
    },
    styleOverrides: {
      root: {
        fontWeight: 600,
      },
    },
  },
  MuiListItem: {
    defaultProps: {
      dense: true,
    },
  },
  MuiOutlinedInput: {
    defaultProps: {
      margin: 'dense' as const,
    },
  },
  MuiSnackbar: {
    styleOverrides: {
      root: {
        boxShadow: '0px 4px 16px rgba(13, 28, 70, 0.15)',
      },
    },
  },
  MuiTable: {
    defaultProps: {
      size: 'small' as const,
    },
    styleOverrides: {
      root: {
        ...typography.body2,
      },
    },
  },
  MuiTableCell: {
    styleOverrides: {
      head: {
        '& .MuiButtonBase-root.MuiCheckbox-root.MuiCheckbox-indeterminate': {
          color: pictonBlue[300],
        },
        '& .MuiCheckbox-root.Mui-checked': {
          color: pictonBlue[300],
        },
        '&:not(:first-child):before': {
          content: '""',
          marginLeft: '-20px',
          marginRight: '20px',
        },
        '&:first-child': {
          paddingLeft: '2rem',
        },
      },
      body: {
        '& .MuiCheckbox-root.Mui-checked': {
          color: pictonBlue[300],
        },
        '&:first-child': {
          paddingLeft: '2rem',
        },
      },
    },
  },
  MuiTablePagination: {
    styleOverrides: {
      root: {
        borderBottom: 'none',
        ...typography.body2,
      },
      selectLabel: {
        ...typography.body2,
      },
      displayedRows: {
        ...typography.body2,
      },
      select: {
        ...typography.body2,
      },
    },
  },
  MuiTextField: {
    defaultProps: {
      variant: 'filled' as const,
      margin: 'dense' as const,
    },
  },
  MuiToolbar: {
    defaultProps: {
      variant: 'dense' as const,
    },
  },
  MuiTypography: {
    styleOverrides: {
      h3: {
        whiteSpace: 'nowrap' as const,
      },
      root: {
        overflowWrap: 'break-word',
        wordBreak: 'break-word',
      },
    },
  },
};
