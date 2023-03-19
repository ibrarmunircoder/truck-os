import { roqMakeStyles } from 'modules/common/utils';

interface EmptyPageClasses {
  container: string;
}

export const useEmptyPageStyles = roqMakeStyles<EmptyPageClasses>(() => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '70vh',
  },
}));
