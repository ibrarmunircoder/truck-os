import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { blueGrey } from 'configuration/theme/colors';
import { ThemeEnum } from 'modules/theme/enums';

export const useValidationErrorsStyles = makeStyles((theme: Theme) => ({
  title: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.grey[900] : theme.palette.common.white,
    fontSize: theme.typography.pxToRem(12)
  },
  listItem: {
    paddingRight: 0,
    paddingLeft: theme.spacing(0.5),
  },
  listItemTextValid: {
    '& .MuiTypography-root': {
      color: theme.palette.mode === ThemeEnum.LIGHT ? blueGrey[900] : 'inherit',
      fontSize: theme.typography.pxToRem(12)
    },
  },
  listItemTextError: {
    '& .MuiTypography-root': {
      color: theme.palette.mode === ThemeEnum.LIGHT ? '#64748B' : '#94A3B8',
      fontSize: theme.typography.pxToRem(12)
    },
  },
  listItemIcon: {
    minWidth: 'auto',
    paddingRight: theme.spacing(2),
  },
}));
