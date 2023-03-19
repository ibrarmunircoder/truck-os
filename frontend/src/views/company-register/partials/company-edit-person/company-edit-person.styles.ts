import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyEditPersonStyles = makeStyles(() => ({
  card: {
    background: colors.white,
    border: `1px solid ${colors.lightGray}`,
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '18px',
    marginBottom: '14px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
  },
  cardHeaderLeft: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.black,
  },
  cardHeaderRight: {
    display: 'flex',
    alignItems: 'center',
  },
  cardHeaderIcons: {
    marginLeft: '20px',
    display: 'flex',
    cursor: 'pointer'
  },
  cardContent: {
    padding: 0,
    marginTop: '17px',
  },
  cardPersonFieldWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'nowrap',
    '&:not(:last-child)': {
      marginBottom: '32px',
    },
  },
  cardPersonFieldLabel: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.darkGray,
  },
  cardPersonFieldValue: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.black,
  },
}));
