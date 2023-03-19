import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useLanguagesMenuStyles = makeStyles((theme: Theme) => ({
  icon: {
    width: 24,
    marginRight: theme.spacing(1.5),
  },
}));
