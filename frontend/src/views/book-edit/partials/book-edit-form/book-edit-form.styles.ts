import { PaperClasses } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils/roq-make-styles';

interface BookEditFormClasses {
  paper?: PaperClasses;
  formSection: string;
  addressTitle: string;
}

export const useBookEditFormStyles = roqMakeStyles<BookEditFormClasses>(() => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
    padding: '3rem 4rem',
  },
  formSection: {
    paddingTop: '1.25rem',
    paddingBottom: '1.125rem',
  },
  addressTitle: {
    textTransform: 'uppercase',
  },
}));
