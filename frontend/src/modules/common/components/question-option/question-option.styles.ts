import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useQuestionOptionStyles = makeStyles(() => ({
  questionOption: {
    background: colors.white,
    border: '1px solid #E7E7E7',
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '4px 25px',
  },
  questionOptionTitle: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.black,
  },
  questionOptionDescription: {
    fontWeight: 500,
    fontSize: '13px',
    letterSpacing: '0.3px',
    lineHeight: '18px',
    color: colors.darkGray,
    margin: '5px 0px 35px 0px',
  },
  questionOptionRadiopGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    gap: '10px',
    '& .MuiFormControlLabel-label': {
      fontWeight: 500,
      fontSize: '16px',
      lineHeight: '20px',
      color: '#212324',
    },
  },
}));
