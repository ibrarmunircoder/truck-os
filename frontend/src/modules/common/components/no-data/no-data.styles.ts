import { roqMakeStyles } from 'modules/common/utils';

export const useNoDataStyles = roqMakeStyles(() => ({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  }
}));
