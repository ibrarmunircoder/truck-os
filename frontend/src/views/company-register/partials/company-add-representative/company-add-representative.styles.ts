import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCompanyAddRepresentativeStyles = makeStyles((theme) => ({
  companyLegalAddRepresentativeDescription: {
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
  companyAddInfoFormContainer:{
    padding: '0 15px',
  },
  tooltip: {
    lineHeight: '20px',
    marginLeft: '20px',
    borderRadius: '8px',
    color: colors.black,
    padding: '10px',
    fontWeight: 600,
    fontSize: '12px',
    backgroundColor: colors.lightPrimary,
  },
  infoIcon: {
    fontSize: '15px',
    color: colors.darkGray,
    position: 'relative',
    top: '3px',
    marginLeft: '5px'
  },
}));
