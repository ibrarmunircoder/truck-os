import { roqMakeStyles } from 'modules/common/utils';

export const useTableContainerStyles = roqMakeStyles(() => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '100%'
  },
}));
