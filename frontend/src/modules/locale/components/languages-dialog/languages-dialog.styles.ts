import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useLanguagesDialogStyles = makeStyles((theme: Theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  icon: {
    width: 24,
    marginRight: theme.spacing(1.5),
  },
}));
