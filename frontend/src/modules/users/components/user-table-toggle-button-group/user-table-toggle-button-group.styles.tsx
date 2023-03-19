import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useUserTableToggleButtonGroupStyles = roqMakeStyles((theme: Theme) => ({
  filterToggleButtonGroup: {
    '&.MuiToggleButtonGroup-root > .MuiToggleButton-root': {
      height: '36px',
      textTransform: 'capitalize',
      fontSize: theme.typography.pxToRem(14),
      borderColor: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.12)' : '#293445',
      fontWeight: 400,
      backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.white : '#293445',
      color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
      '&.Mui-selected': {
        fontWeight: 500,
        backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.black : '#7F8CA2',
        color: theme.palette.common.white,
      },
    },
  },
}));
