import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ThemeEnum } from 'modules/theme/enums';

export const useLanguageLinkStyles = makeStyles((theme: Theme) => ({
  root: {
    color: (props: { inheritColor?: boolean }) =>
      props.inheritColor
        ? 'inherit'
        : theme.palette.mode === ThemeEnum.LIGHT
        ? theme.palette.grey[500]
        : theme.palette.common.white,
    verticalAlign: 'middle',
    display: 'inline-flex',
    cursor: 'pointer',
    whiteSpace: 'nowrap'
  },
}));
