import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useViewHeaderStyles = makeStyles(() => ({
  viewHeader: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
  },
  viewHeaderContentContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  viewHeaderTitle: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    color: colors.white,
  },
  viewHeaderSubTitle: {
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '22px',
    textAlign: 'center',
    display: 'block',
    color: colors.white,
  },
  backButton: {
    width: '36px',
    height: '36px',
    backgroundColor: '#64AD63',
    borderRadius: '9px',
    border: 'none',
    color: '#fff',
    cursor: 'pointer',
    position: 'absolute',
    left: '15px',
  },
}));
