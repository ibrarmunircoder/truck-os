import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useUploadDocumentFormStyles = makeStyles<Theme, Props>((theme) => ({
  stepContent: {
    minHeight: (props) => (props.isDesktop ? 'auto' : 'calc(100vh - 331px)'),
    marginBottom: (props) => (props.isDesktop ? '40px' : '16px'),
  },
  stepButton: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: 400,
    color: colors.white,
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    boxShadow: 'none',
    borderRadius: '10px',
    textTransform: 'initial',
    letterSpacing: '0.3px',
    maxWidth: (props) => (props.isDesktop ? '460px' : '100%'),
    '&:hover': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    '&:focus': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    '&.Mui-disabled': {
      backgroundColor: colors.mediumDarkGray,
      color: colors.white,
    },
  },
  cardBox: {
    background: colors.white,
    border: `1px solid ${colors.lightGray}`,
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    padding: '15px',
    marginBottom: '1rem',
    maxWidth: (props) => (props.isDesktop ? '460px' : '100%'),
    minHeight: (props) => (props.isDesktop ? '300px' : 'auto'),
  },
  buttonText: {
    flex: 1,
    textAlign: 'left',
    margin: '0px 5px',
  },
  uploadSuccessButton: {
    backgroundColor: colors.primary,
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.white,
    textTransform: 'initial',
    width: '100%',
    boxShadow: 'none',
    padding: '14px 20px',
    borderRadius: '8px',
    marginBottom: '15px',
    position: 'relative',
    '&:hover': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
    '&:focus': {
      backgroundColor: colors.primary,
      borderColor: colors.primary,
    },
  },
  uploadInput: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
  },
  cardTitle: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.black,
    marginBottom: '16px',
  },
  cardText: {
    fontSize: '15px',
    color: colors.darkGray,
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '12px',
    letterSpacing: '0.3px',
  },
  uploadButton: {
    backgroundColor: colors.gray,
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.black,
    textTransform: 'initial',
    width: '100%',
    boxShadow: 'none',
    padding: '14px 20px',
    borderRadius: '8px',
    marginBottom: '15px',
    position: 'relative',
    '&:hover': {
      backgroundColor: colors.lightPrimary,
      borderColor: colors.lightPrimary,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: colors.lightPrimary,
      borderColor: colors.lightPrimary,
    },
    '&:focus': {
      backgroundColor: colors.lightPrimary,
      borderColor: colors.lightPrimary,
    },
  },
  btnPlusIcon: {
    color: colors.darkGray,
    width: '1rem',
    height: '1rem',
  },
  documentNoteSection: {
    marginTop: '14px',
    order: 4,
    [theme.breakpoints.up('md')]: {
      order: 2,
      padding: '0px',
      marginTop: '8px',
      marginBottom: '14px',
    }
  },
  documentNoteSectionInfoIcon: {
    marginRight: '7px',
  },
  documentNoteSectionHeader: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '15px',
    color: colors.primary,
    [theme.breakpoints.up('md')]: {
      fontSize: '15px',
      marginBottom: '5px'
    }
  },
  documentNoteSectionDescription: {
    fontWeight: 500,
    fontSize: '12px',
    lineHeight: '15px',
    color: colors.darkGray,
  },
  documentNoteSectionDivider: {
    width: '2px',
    background: colors.lightGray,
    transform: 'rotate(179deg)',
    height: '100%',
  },
  tooltip: {
    lineHeight: '20px',
    marginLeft: '20px',
    borderRadius: '8px',
    color: colors.black,
    padding: '10px',
    fontWeight: 600,
    zIndex: 1000,
    fontSize: '12px',
    backgroundColor: colors.lightPrimary,
  },
  infoIcon: {
    fontSize: '25px',
    color: colors.black,
    position: 'relative',
    top: '3px',
    cursor: 'pointer'
  },
  backButton: {
    backgroundColor: colors.mediumDarkGray,
    fontWeight: 400,
    fontSize: '16px',
    lineHeight: '20px',
    color: colors.white,
    textTransform: 'initial',
    width: '100%',
    boxShadow: 'none',
    padding: '14px 20px',
    borderRadius: '8px',
    marginBottom: '15px',
    maxWidth: (props) => (props.isDesktop ? '460px' : '100%'),
    position: 'relative',
    '&:hover': {
      backgroundColor: colors.lightGray,
      borderColor: colors.lightGray,
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: colors.lightGray,
      borderColor: colors.lightGray,
    },
    '&:focus': {
      backgroundColor: colors.lightGray,
      borderColor: colors.lightGray,
    },
  },
  virtualDataBox: {
    display: 'flex',
    alignItems: 'flex-start',
    maxWidth: (props) => (props.isDesktop ? '460px' : '100%'),
  },
  virtualHeader:{
    fontSize: '14px',
    color: colors.black,
    fontWeight: 500,
    lineHeight: '20px',
    marginBottom: '5px'
  },
  virtualText:{
    fontSize: '14px',
    color: colors.darkGray,
    fontWeight: 500,
    lineHeight: '24px'
  },
  virtualSubheading:{
    fontSize: '14px',
    color: colors.darkGray,
    fontWeight: 500,
    lineHeight: '22px',
    minWidth: '82px',
    borderRight: `2px solid ${colors.lightGray}`,
    marginRight: '15px',
    textTransform: 'capitalize'
  },
  virtualSubtext:{
    fontSize: '14px',
    color: colors.darkGray,
    fontWeight: 500,
    lineHeight: '22px',
  },
  virtualListBox:{
    display: 'flex',
  }
}));
