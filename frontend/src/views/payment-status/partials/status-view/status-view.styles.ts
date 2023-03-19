import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
    isDesktop: boolean;
};

export const useStatusViewStyles = makeStyles<Theme, Props>(() => ({
    statusHeading:{
        fontSize: '18px',
        fontWeight: 500,
        marginBottom: '15px',
        color: colors.black,
    } ,
    statusPragraph: {
        color: colors.darkGray, 
        fontSize: '14px',
        fontWeight: 500,   
        lineHeight:'25px',
        letterSpacing: '0.3px',
    },
    backButton: {
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
    contentBox: {
        padding:'18px',
        textAlign: 'center',
        width: '100%',
        margin: (props) => props.isDesktop ? '0 auto' : '0',
        maxWidth: (props) => props.isDesktop ? '450px' : '100%',
    },
    textButton:{
        color: colors.primary,
        textDecorationColor: colors.primary,
        marginTop: '15px',
    },
    mainStatusBox: {
        display: 'flex',
        minHeight:  (props) => props.isDesktop ? 'auto' : 'calc(100vh - 80px)',
        flexDirection: 'column',
        maxWidth: '1000px',
        margin: '0 auto',
        justifyContent:'space-between',
    },
    truckContentBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flex: 1,
        paddingTop: '50px',
        textAlign: 'center'
    },
    truckImage:{
        '& svg path':{
            width: '100%'
        }
    }
}));





