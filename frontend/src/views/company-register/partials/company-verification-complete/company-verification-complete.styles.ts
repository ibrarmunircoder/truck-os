import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyVerificationCompleteStyles = makeStyles(() => ({
  companyVerificationCompleteTitle: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    textAlign: 'center',
    color: '#000000',
  },
  companyVerificationCompleteDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    margin: '10px 0px 20px 0px',
    padding: '0px 25px',
  },
  companyVerificationCompleteSection: {
    marginTop: '120px',
  },
  companyVerificationCompleteImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '40px',
  },
  companyVerificationCompleteContainer:{
    padding: '0 15px',
  }
}));
