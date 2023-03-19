import { roqMakeStyles } from 'modules/common/utils';

export const useAsyncSelectStyles = roqMakeStyles(() => ({
  dropDownPaper: {
    maxHeight: 200,
  },
  loader: {
    width: '100%',
    padding: '10px 0',
    textAlign: 'center',
  },
}));
