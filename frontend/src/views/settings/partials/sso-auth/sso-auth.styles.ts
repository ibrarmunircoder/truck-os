import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useSsoAuthStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    width: '100%'
  },
  title: {
    fontSize: theme.spacing(2)
  },
  disconnectButton: {
    marginTop: theme.spacing(3),
  },
  googleIcon: {
    color: '#DB4437',
  },
  appleIcon: {
    color: theme.palette.mode === 'light' ? '#0F172A' : '#FFF',
  },
  linkedinIcon: {
    color: '#0A66C2'
  },
}))
