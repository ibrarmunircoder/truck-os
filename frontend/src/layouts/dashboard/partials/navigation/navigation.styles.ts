/* eslint-disable @roq/no-eslint-disable */
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useNavigationStyles = makeStyles<Theme, Props>(() => ({
  navigationBox: {
    position: 'fixed',
    bottom: (props) => (props.isDesktop ? 'auto' : '0'),
    left: 0,
    right: (props) => (props.isDesktop ? 'auto' : '0'),
    top: (props) => (props.isDesktop ? '0' : 'auto'),
    width: (props) => (props.isDesktop ? '260px' : 'auto'),
    height: (props) => (props.isDesktop ? '100vh' : 'auto'),
    paddingBottom: (props) => (props.isDesktop ? '20px' : '0'),
    overflowX: (props) => (props.isDesktop ? 'hidden' : 'inherit'),
    backgroundColor: (props) => (props.isDesktop ? '#E7E7E7' : '#ffffff'),
    zIndex: 9999,
    boxShadow: (props) => (props.isDesktop ? '0px 4px 4px rgba(0, 0, 0, 0.25)' : '0px -15px 100px rgba(0, 0, 0, 0.2)'),
  },
  navigation: {
    display: 'flex',
    flexDirection: (props) => (props.isDesktop ? 'column' : 'row'),
    alignItems: (props) => (props.isDesktop ? 'flex-start' : 'center'),
    justifyContent: 'space-around',
    padding: (props) => (props.isDesktop ? '0' : '11px 8px'),
    position: 'relative',
  },
  menuitem: {
    width: (props) => (props.isDesktop ? '100%' : 'auto'),
    margin: (props) => (props.isDesktop ? '8px 0' : '0'),
    padding: 0,
    lineHeight: 'initial',
    position: 'relative',
    '&:before': {
      content: '""',
      position: 'absolute',
      height: (props) => (props.isDesktop ? '100%' : '3px'),
      width: (props) => (props.isDesktop ? '7px' : '100%'),
      borderRadius: (props) => (props.isDesktop ? '0px 15px 15px 0px' : '0px 0px 10px 10px'),
      left: (props) => (props.isDesktop ? '0' : 'auto'),
      backgroundColor: '#65A664',
      top: (props) => (props.isDesktop ? '0' : '-11px'),
      display: 'inline-block',
      opacity: 0,
      visibility: 'hidden',
    },
    '&:hover, &:focus': {
      backgroundColor: 'transparent !important',
    },
    '&.Mui-selected': {
      backgroundColor: 'transparent',
      '&:hover, &:focus': {
        backgroundColor: 'transparent',
      },
      '& .MuiListItemText-root span': {
        color: '#212324',
      },
      '&:before': {
        opacity: 1,
        visibility: 'visible',
      },
    },
    '& .MuiListItemIcon-root': {
      minWidth: 'auto',
      width: '38px',
      height: '38px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginRight: (props) => (props.isDesktop ? '15px' : '0px'),
    },
    '& .MuiListItemText-root span': {
      fontSize: (props) => (props.isDesktop ? '15px' : '13px'),
      fontWeight: 500,
      color: '#7F828B',
      textDecoration: 'none',
    },
  },
  menuLine: {
    position: 'absolute',
    height: '3px',
    width: '100%',
    borderRadius: '0px 0px 10px 10px',
    backgroundColor: '#65A664',
    top: '-11px',
    display: 'inline-block !important',
    opacity: 0,
    visibility: 'hidden',
  },
  menuActiveLine: {
    opacity: 1,
    visibility: 'visible',
  },
  menuItemLink: {
    display: 'flex',
    alignItems: 'center',
    width: (props) => (props.isDesktop ? '100%' : 'auto'),
    padding: (props) => (props.isDesktop ? '14px 25px' : '0'),
    flexDirection: (props) => (props.isDesktop ? 'row' : 'column'),
    textDecoration: 'none',
    position: 'relative',
  },
  userDetails: {
    marginTop: '15px',
  },
  userInfoBox: {
    padding: '25px 20px',
    textAlign: 'center',
    flexDirection: 'column',
    display: (props) => (props.isDesktop ? 'flex' : 'none'),
  },
  userInfoAvatar: {
    width: '108px',
    height: '108px',
    margin: '0 auto',
    color: '#F8FAFC',
    backgroundColor: '#94A3B8',
  },
  companyNameTitle: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.black,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    lineHeight: '24px',
    maxWidth: '100%',
    marginBottom: '5px',
  },
  userName: {
    fontSize: '16px',
    fontWeight: 500,
    color: colors.black,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    lineHeight: '24px',
    marginTop: '15px',
    marginBottom: '5px',
  },
  userEmail: {
    fontSize: '14px',
    fontWeight: 500,
    color: colors.primary,
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    maxWidth: '100%',
    lineHeight: '24px',
    marginBottom: '5px',
  },
  logoView: {
    display: 'inline-block',
    maxHeight: '29px',
  },
}));
