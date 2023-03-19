import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useConfirmationModalStyles = makeStyles<Theme, Props>((theme: Theme) => ({
  confirmModal: {
    position: 'absolute',
    top: '50%',
    left: (props) => props.isDesktop ? 'calc(50% + 130px)' : '50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: colors.white,
    [theme.breakpoints.down('sm')]: {
      width: 305,
    },
    [theme.breakpoints.up('sm')]: {
      width: 420,
    },
    maxWidth: '345px',
    padding: '16px',
    wordWrap: 'break-word',
    boxShadow: '0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 0.375rem 1.875rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem rgba(0, 0, 0, 0.2)',
    borderRadius: '0.5rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.25,
    background: theme.palette.background.default,
  },
  confirmMessage: {
    marginBottom: '1rem',
    color: colors.darkGray,
    lineHeight: '20px',
    fontSize: '14px',
  },
  confirmTitle: {
    marginBottom: '1rem',
    fontWeight: 500,
    color: colors.black
  }
}));
