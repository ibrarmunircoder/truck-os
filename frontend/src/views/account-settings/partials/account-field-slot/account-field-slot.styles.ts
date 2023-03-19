import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useAccountFieldSlotStyles = makeStyles(() => ({
  accountFieldSlotTitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    color: colors.darkGray,
    padding: '8px 0px',
    paddingRight: '5px'
  },
  accountFieldSlotSubtitle: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    color: colors.black,
    padding: '8px 0px 8px 17px',
    flex: 1
  },
  greenText: {
    color: colors.primary,
  },
  verificationTitle:{
    display: 'flex',
    alignItems: 'center',
    '& span':{
      paddingLeft: '7px',
    }
  },
  pl17:{
    paddingLeft: '17px'
  },
  accountFieldSlotVerifcationSubtitle:{
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '22px',
    color: colors.darkGray,
    padding: '8px 0px 8px 17px',
    flex: 1
  },
  textLink: {
    textDecoration: 'underline',
    color: colors.darkGray,
    display: 'inline-block'
  },
  addressFieldText: {
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    color: colors.black,
    display: 'block',
    flex: 1,
    marginBottom: '3px'
  }
}));
