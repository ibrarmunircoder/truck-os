import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
    isDesktop: boolean;
};

export const usePageHeaderStyles = makeStyles<Theme, Props>((theme) => ({
    header: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1,
        padding: '8px 16px',
        paddingTop: '23px',
        backgroundColor: colors.white,
        marginLeft: '0',
        [theme.breakpoints.up('md')]: {
            marginLeft: '260px',
            padding: '40px 50px 8px 50px'
        },
    },
    mainTitle: {
        fontSize: '24px',
        fontWeight: 500,
        color: '#1B1B1B',
        [theme.breakpoints.up('md')]: {
            backgroundColor: '#fafafa',
            padding: '15px 20px',
            borderRadius:'10px',
        }
        
    },
}));
