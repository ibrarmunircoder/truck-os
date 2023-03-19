import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

export const useNavigationMenuStyles = makeStyles((theme: Theme) => ({
  listCollapsed: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  divider: {
    backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(233, 234, 237, 1)' : '#1e293b',
  },
  dividerMaskLayer: {
    opacity: theme.palette.mode === ThemeEnum.LIGHT ? 0.3 : 0.5,
    backgroundColor: theme.palette.common.white,
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
}));
