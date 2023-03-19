import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { yankeesBlue } from 'configuration/theme/colors';
import { ThemeEnum } from 'modules/theme/enums';

export const useHeaderMenuStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'row',
    padding: 0,
    backgroundColor: 'inherit',
  },
  badge: {
    '& .MuiBadge-badge': {
      right: -11,
    },
    '& .MuiBadge-colorError': {
      color: theme.palette.common.white,
      backgroundColor: theme.palette.error.main,
    },
  },
  accountDropdownMenu: {
    background: `linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #1F2B48`,
    color: theme.palette.mode === ThemeEnum.LIGHT ? yankeesBlue[900] : '#1F2B48',
    fontWeight: 500,
  },
  accountDropdownMenuMaskLayer: {
    background: theme.palette.mode === ThemeEnum.LIGHT ? '#ffffff' : 'inherit',
    opacity: theme.palette.mode === ThemeEnum.LIGHT ? 0.6 : 1,
  },
}));
