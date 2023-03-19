import { makeStyles } from '@mui/styles';

export const useCompanyHeaderStyles = makeStyles((theme) => ({
  companyHeader: {
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    textAlign: 'center',
    marginBottom : '25px',
    [theme.breakpoints.up('md')]: {
      textAlign: 'left',
    },
    color: '#000000',
  },
}));
