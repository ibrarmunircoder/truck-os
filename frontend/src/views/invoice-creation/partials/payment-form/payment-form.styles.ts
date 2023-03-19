import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
    isDesktop: boolean;
};

export const usePaymentFormStyles = makeStyles<Theme, Props>(() => ({
    stepContent: {
        padding: '0 16px',
        minHeight: (props) => (props.isDesktop ? 'auto' : 'calc(100vh - 331px)'),
        margin: '0 auto',
        marginBottom: (props) => (props.isDesktop ? '40px' : '16px'),
    },
    stepButton: {
        padding: '10px 20px',
        fontSize: '16px',
        fontWeight: 400,
        color: '#fff',
        backgroundColor: colors.primary,
        borderColor: colors.primary,
        boxShadow: 'none',
        borderRadius: '10px',
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
            color: '#fff'
        }
    },
}));
