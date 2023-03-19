import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

export const useBreadcrumbsStyles = makeStyles((theme: Theme) => ({
  item: {
    fontWeight: 400,
    color: theme.palette.grey[500],
    lineHeight: '19px'
  },
  lastItem: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.grey[900] : theme.palette.common.white,
  },
}));
