import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useExitPaymentModalStyles = makeStyles(() => ({
    confirmButton: {
        padding: '5px 20px',
        fontSize: '14px',
        fontWeight: 400,
        color: colors.white,
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        boxShadow: 'none',
        borderRadius: '30px',
        textTransform: 'initial',
        letterSpacing: '0.3px',
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
            color: colors.white
        }
    },
    cancelButton:{
        padding: '5px 20px',
        fontSize: '14px',
        fontWeight: 400,
        color: colors.white,
        backgroundColor: colors.mediumDarkGray,
        borderColor: colors.mediumDarkGray,
        boxShadow: 'none',
        borderRadius: '30px',
        textTransform: 'initial',
        letterSpacing: '0.3px',
        '&:hover': {
            backgroundColor: colors.darkGray,
            borderColor: colors.darkGray,
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: colors.darkGray,
            borderColor: colors.darkGray,
        },
        '&:focus': {
            backgroundColor: colors.darkGray,
            borderColor: colors.darkGray,
        },
        '&.Mui-disabled': {
            backgroundColor: colors.lightGray,
            color: colors.white
        }
    }
}));
