import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useEmptyRecordStyles = makeStyles(() => ({
  emptyRecordTitle: {
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '23px',
    color: colors.black,
    margin: '15px 0',
  },
  emptyRecordSubtitle: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '15px',
    color: colors.darkGray,
  },
}));
