import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useStepperStyles = makeStyles<Theme, Props>((theme) => ({
  wizardSteps: {
    display: 'flex',
    padding: (props) => (props.isDesktop ? '16px 2px' : '16px 0px'),
    border: '1px solid #E7E7E7',
    borderRadius: '10px',
    listStyle: 'none',
    margin: '0 auto',
    marginBottom: (props) => (props.isDesktop ? '40px' : '20px'),
    marginTop: '8px',
    '& li': {
      display: 'flex',
      flex: 1,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      '&:before': {
        position: 'absolute',
        content: '""',
        height: '1px',
        width: '100%',
        top: '12px',
        left: '50%',
        backgroundColor: '#E7E7E7',
      },
      '&:last-child:before': {
        display: 'none',
      },
    },
  },
  stepDeskTitle: {
    marginTop: '60px',
    marginBottom: '20px',
    fontSize: '20px',
    fontWeight: 500,
    color: colors.black,
  },
  stepLine: {
    height: '1px',
    width: '100%',
    top: '12px',
    left: '-50%',
    backgroundColor: '#E7E7E7',
    position: 'absolute',
  },
  stepNumber: {
    width: '25px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '12px',
    border: '1px solid #D6D7D7',
    borderRadius: '50%',
    fontSize: '16px',
    fontWeight: '500',
    zIndex: 1,
    backgroundColor: '#ffffff',
    color: '#fff',
    '& .MuiStepIcon-text': {
      fill: '#D6D7D7',
      fontSize: '14px',
    },
  },
  stepText: {
    '& .MuiStepLabel-label': {
      color: '#7E828B',
      fontSize: '11.2px',
      fontWeight: '500',
      textAlign: 'center',
      lineHeight: '20px',
      marginTop: 0,
      maxWidth: '65px',
      overflowWrap: 'break-word',
      margin: '0 auto',
      [theme.breakpoints.up('sm')]: {
        maxWidth: '100%',
        fontSize: '13px',
      },
      '&.Mui-active, &.Mui-completed': {
        color: '#000000',
      },
    },
  },
  activeStepNumber: {
    backgroundColor: '#65A664',
    borderColor: '#65A664',
    color: '#65A664 !important',
    '& .MuiStepIcon-text': {
      fill: '#fff',
    },
  },
  completeStepNumber: {
    border: 'none',
    color: '#65a664 !important',
    backgroundColor: ' #fff',
  },
  stepError: {
    backgroundColor: '#F54A4A',
    borderColor: '#F54A4A',
    color: '#F54A4A !important',
  },
}));
