import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useAvatarUpdateStyles = roqMakeStyles((theme: Theme) => ({
  avatarWrap: {
    boxShadow: '0px 4px 16px rgba(13, 28, 70, 0.15)',
    width: 64,
    height: 64,
    borderRadius: '100%',
    overflow: 'hidden',
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
  avatarImage: {
    objectFit: 'cover',
    width: 'inherit',
    height: 'inherit',
  },
  avatarText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 40,
    height: '100%',
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
  loaderWrap: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'rgba(203, 213, 225, 0.5)',
  },
  loaderColor: {
    color: theme.palette.primary[500],
  },
}));
