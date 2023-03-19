import { roqMakeStyles } from 'modules/common/utils';

export const useAuthorsTableStyles = roqMakeStyles(() => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  tableIcon: {
    '&:first-child': {
      marginLeft: -12,
    },
  },
}));
