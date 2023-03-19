import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useAccountBasicInfoStyles = makeStyles<Theme, Props>((theme) => ({
  accountBasicInfoPageTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '24px',
    lineHeight: '22px',
    color: '#1B1B1B',
    backgroundColor: (props) => props.isDesktop ? '#fafafa' : 'transparent',
    padding: (props) => props.isDesktop ? '20px' : '0px 20px',
    borderRadius: (props) => props.isDesktop ? '10px' : '0',
    marginBottom: '40px'
  },
  accountBasicInfoAvatar: {
    width: '67.5px',
    height: '67.5px',
    marginRight: '20px'
  },
  accountBasicInfoProfileHeader: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '20px',
    lineHeight: '22px',
    color: colors.darkGray,
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
  userDetail:{
    display: 'flex',
    alignItems: 'center',
  },
  accountSettingOptions:{
    flexDirection: 'column',
    minHeight: (props) => props.isDesktop ? 'calc(100vh - 172px)' : 'auto',
    marginTop: (props) => props.isDesktop ? '0' : '64px',
  },
  accountItem:{
    '& > div':{
      border: (props) => props.isDesktop ? `1px solid ${colors.lightGray}` : 'none',
      borderTop: `1px solid ${colors.lightGray} !important`,
      borderRadius: (props) => props.isDesktop ? '10px' : '0',
      marginBottom: (props) => props.isDesktop ? '10px' : '0',
    },
    '&:nth-last-child(3) > div':{
      borderBottom: `1px solid ${colors.lightGray}`,
    }
  },
  contactDialog:{
    [theme.breakpoints.up('md')]: {
      left: '260px',
    }
  },
  dialogBox:{
    backgroundColor: colors.white,
  }
}));
