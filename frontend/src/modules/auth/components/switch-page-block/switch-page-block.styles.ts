import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useSwitchPageBlockStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    fontWeight: 500,
    lineHeight: '32px',
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.mode === 'light' ? '#131414' : theme.palette.common.white,
  },
  subHeading: {
    lineHeight: theme.typography.pxToRem(24),
    textAlign: 'center',
    letterSpacing: '0.15px',
    color: theme.palette.mode === 'light' ? `rgba(0, 0, 0, 0.6)` : theme.palette.common.white,
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
}));
