import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useAccountAccordianStyles = makeStyles<Theme, Props>((theme) => ({
  accountCompanyDetailsAccordian: {
    border: (props) => props.isDesktop ? `1px solid ${colors.lightGray}` : 'none',
    borderTop: `1px solid ${colors.lightGray} !important`,
    marginBottom: (props) => props.isDesktop ? '10px' : '0',
    '&:last-child':{
      borderBottom: `1px solid ${colors.lightGray}`,
    },
    '&.MuiAccordion-root': {
      borderRadius: (props) => props.isDesktop ? '10px' : '0',
      boxShadow: 'none',
      backgroundColor: 'unset',
      '&:before':{
        display:'none'
      }
    },
    '&.Mui-expanded':{
      margin: '0 0 10px 0'
    }
  },
  accordionSummary:{
    minHeight: 'auto',
    '& .MuiAccordionSummary-content':{
      margin: (props) => props.isDesktop ? '16px 0' : '12px 0',
      '&.Mui-expanded h3':{
        color: colors.black
      }
    },
    '& .MuiAccordionSummary-expandIconWrapper':{
      color : colors.lightGray3
    },
    '&.Mui-expanded':{
      minHeight: 'auto'
    }
  },
  accountCompanyDetailsAccordianTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '18px',
    lineHeight: '22px',
    color: colors.darkGray,
  },
  fontSmall: {
    
  },
  textLink: {
    textDecoration: 'underline',
    color: colors.darkGray,
    cursor: 'pointer'
  },
  ml5: {
    marginLeft: '5px',
    marginRight: '5px'
  },
  infoText:{
    display:'flex',
    marginTop: '10px',
    lineHeight: '22px',
    alignItems: 'flex-start',
    fontSize: '12px',
    fontWeight: 600,
    color : colors.lightGray3,
    '& svg':{
      marginRight: '5px',
    }
  },
  infoIbanText:{
    lineHeight: '22px',
    fontSize: '12px',
    fontWeight: 600,
    color: colors.lightGray3
  },
  greenText:{
    color: colors.primary
  },
  subTitle:{
    fontSize: '16px',
    fontWeight: 500,
    lineHeight: '20px',
    color: colors.black
  },
  dialogContentTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    color: colors.black,
    textAlign: 'center',
  },
  dialogContentPhoneNumber: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    marginBottom: 0,
    color: colors.primary,
    marginTop: '45px',
  },
  dialogContentDescription: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    textAlign: 'center',
    marginTop: '13px',
  },
  contactDialog:{
    [theme.breakpoints.up('md')]: {
      left: '260px',
    }
  },
  dialogBox:{
    backgroundColor: colors.white,
  },
  invoiceDetailText:{
    lineHeight: '22px',
    fontStyle: 'normal',
    fontSize: '15px',
    fontWeight: 500,
    color: colors.black,
  },
  invoiceInfo:{
    margin: '3px 0'
  }
}));
