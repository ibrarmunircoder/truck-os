import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useTablePaginationStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.text.secondary : theme.palette.common.white,
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(6),
    '& .MuiButtonBase-root.MuiPaginationItem-root.Mui-selected': {
      backgroundColor: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.04)' : 'rgba(255, 255, 255, 0.15)',
    },
    '& .MuiButtonBase-root.MuiPaginationItem-root': {
      color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
    },
  },
}));
