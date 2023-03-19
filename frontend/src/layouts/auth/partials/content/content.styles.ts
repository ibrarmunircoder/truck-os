import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useContentStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      padding: theme.spacing(0, 3),
      flexGrow: (props: { stretched: boolean }) => props.stretched ? 1 : 0
    },
  },
}));
