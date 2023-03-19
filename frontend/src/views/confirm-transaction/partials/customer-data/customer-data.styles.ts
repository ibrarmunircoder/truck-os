import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useCustomerDataStyles = makeStyles(() => ({
    confirmTitle:{
        marginBottom: '20px',
        fontSize: '15px',
        fontWeight: 500,
        color: colors.black
    },
    customerview: {
        display: 'flex',
        alignItems: 'flex-start',
        width: '100%',
        padding: '18px 10px',
        borderRadius: '10px',
        border: `1px solid ${colors.lightGray}`,
        background: colors.white,
        boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
        marginBottom: '20px',
    },
    customerlogo: {
        maxWidth: '80px',
        minWidth: '80px',
        width: '100%',
        marginBottom: '30px'
    },
    companyTitle: {
        color: colors.black,
        fontSize: '16px',
        lineHeight: '20px',
        fontWeight: 500,
        marginBottom: '8px'
    },
    companyText: {
        color: colors.darkGray,
        fontSize: '14px',
        fontWeight: 500,
        lineHeight: '20px',
        margin: '4px 0px'
    },
    companyDetails: {
        marginLeft: '13px',
    },
    editData:{
        display:'flex',
        flexDirection: 'column',
    },
    editButton:{

    }
}));