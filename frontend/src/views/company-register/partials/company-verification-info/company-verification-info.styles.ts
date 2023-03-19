import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyVerificationInfoStyles = makeStyles(() => ({
  companyVerificationInfoTitle: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#000000',
  },
  companyVerificationInfoDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    margin: '10px 0px 20px 0px',
    padding: '0px 25px',
  },
  paragraphText:{
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '24px',
    color: colors.darkGray,
    marginBottom: '10px'
  },
  companyVerificationContainer:{
    padding: '0 15px',
  }
}));
