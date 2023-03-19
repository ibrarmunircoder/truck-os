import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
  isDesktop: boolean;
};

export const useCustomerFormStyles = makeStyles<Theme, Props>(() => ({
    stepContent: {
        padding: '0 16px',
        minHeight: (props) => (props.isDesktop ? 'auto' : 'calc(100vh - 331px)'),
        margin: '0 auto',
        marginBottom: (props) => (props.isDesktop ? '40px' : '16px'),
    },
    formControl: {
        marginTop: 0,
        marginBottom: '20px',
        '& .MuiOutlinedInput-root': {
            marginTop: 0,
            borderRadius: '10px',
            paddingTop: '0px',
            paddingLeft: 0,
            paddingBottom: 0,
            '&.Mui-disabled': {
                backgroundColor: colors.lightGray
            },
            '&.Mui-disabled fieldset': {
                borderColor: 'rgba(15, 23, 42, 0.26)',
            },
            '& fieldset': {
                border: `1px solid ${colors.mediumDarkGray}`,
            },
            '&:hover fieldset': {
                borderColor: colors.primary,
            },
            '&.Mui-focused fieldset': {
                borderColor: colors.primary,
                borderWidth: '1px'
            },
            '&.Mui-error fieldset': {
                borderColor: colors.error,
            },
            "& .MuiInputBase-input": {
                padding: '12px 15px',
                paddingRight: '10px',
                height: 'auto',
                fontSize: '15px',
                color: colors.black,
                '&.Mui-disabled':{
                    '-webkit-text-fill-color': 'rgba(15, 23, 42, 0.38)',
                },
            },
            '& .MuiAutocomplete-clearIndicator': {
                color: 'rgba(15, 23, 42, 0.54)',
            },
            '& .MuiAutocomplete-popupIndicator': {
                color: 'rgba(15, 23, 42, 0.54)',
            },
        },
        "& .MuiFormLabel-root": {
            color: colors.darkGray,
            fontSize: '14px',
            fontWeight: 500,
            letterSpacing: '0.3px',
            transform: 'translate(18px, 14px) scale(1)'
        },
        '& .MuiFormLabel-root.Mui-focused': {
            transform: 'translate(14px, -7px) scale(0.85)'
        },
        '& .MuiFormLabel-root.MuiFormLabel-filled': {
            transform: 'translate(14px, -7px) scale(0.85)'
        },
        '& .MuiFormLabel-root.Mui-error': {
            color: colors.error,
        },
        '& .MuiFormHelperText-root': {
            marginTop: '0px',
            marginLeft: '15px',
            fontWeight: 500,
            fontSize: '13px'
        }
    },
    iconButton: {
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
        marginBottom: '20px',
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
    btnPlusIcon: {
        color: colors.darkGray,
        width: '1rem',
        height: '1rem'
    },
    buttonText: {
        flex: 1,
        textAlign: 'left',
        margin: '0px 5px'
    },
    paperBackground: {
        backgroundColor: colors.white,
        color: colors.lightGray3,
        '& .MuiAutocomplete-option.Mui-focused': {
            backgroundColor: 'rgba(15, 23, 42, 0.04)',
        },
        '& .MuiAutocomplete-noOptions': {
            color: 'rgba(15, 23, 42, 0.54)',
        }
    }
}));
