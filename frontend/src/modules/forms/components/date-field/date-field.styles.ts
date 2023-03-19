import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useDateFieldStyles = makeStyles(() => ({
    formControl: {
        marginTop: 0,
        marginBottom: '20px',
        '& .MuiOutlinedInput-root': {
            marginTop: 0,
            borderRadius: '10px',
            paddingRight: '8px',
            '&.Mui-disabled':{
                backgroundColor: colors.lightGray
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
                color: colors.black
            },
            '& .MuiIconButton-root':{
                color: 'rgba(15, 23, 42, 0.54)',
            }
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
    paperDialog:{
        backgroundColor: colors.white,
        '& .MuiCalendarPicker-root div':{
            color: colors.lightGray3
        },
        '& .MuiCalendarPicker-root':{
            color: colors.lightGray3
        },
        '& .MuiTypography-root':{
            color: colors.lightGray3
        },
        '& .MuiIconButton-root':{
            color: colors.lightGray3
        },
        '& .MuiPickersDay-root':{
            backgroundColor: colors.white,
            color: colors.black,
            '&.Mui-selected':{
                color: colors.white,
                backgroundColor: colors.primary,
            }
        },
        '& .PrivatePickersYear-yearButton':{
            '&.Mui-selected':{
                color: colors.white,
                backgroundColor: colors.primary,
            }
        }
    },
    dialogDatePicker:{
        '& .MuiPaper-root':{
            backgroundColor: colors.white,
        },
        '& .MuiCalendarPicker-root div':{
            color: colors.lightGray3
        },
        '& .MuiTypography-root':{
            color: colors.lightGray3
        },
        '& .MuiIconButton-root':{
            color: colors.lightGray3
        },
        '& .MuiButton-text':{
            color: colors.lightGray3
        },
        '& .MuiPickersDay-root':{
            backgroundColor: colors.white,
            color: colors.black,
            '&.Mui-selected':{
                color: colors.white,
                backgroundColor: colors.primary,
            }
        },
        '& .PrivatePickersYear-yearButton':{
            '&.Mui-selected':{
                color: colors.white,
                backgroundColor: colors.primary,
            }
        }
    }
}));
