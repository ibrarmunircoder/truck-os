import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyLegalRepresentativeStyles = makeStyles((theme) => ({
  companyLegalRepresentativeDescription: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    margin: '10px 0px 20px 0px',
    padding: '0px 25px',
    textAlign: 'justify',
    [theme.breakpoints.up('md')]: {
      padding: '0px',
    }
  },
  companyLegalInfoFormContainer:{
    padding: '0 12px',
  }
}));
