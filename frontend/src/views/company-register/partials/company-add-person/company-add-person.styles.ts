import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyAddPersonStyles = makeStyles((theme) => ({
  companyAddPerson: {
    background: colors.white,
    border: `1px solid ${colors.lightGray}`,
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '5px 17px 14px 17px',
    marginBottom: '15px',
  },
  cardHeaderIcons: {
    marginRight: '20px',
    display: 'flex',
    cursor: 'pointer',
  },
  companyAddPersonHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWarp: 'nowrap',
  },
  companyAddPersonTitle: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    color: colors.black,
    margin: '10px 0px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '20px',
    },
  },
}));
