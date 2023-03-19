import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

// eslint-disable-next-line @roq/no-invalid-style-resource
type Props = {
    isDesktop: boolean;
};

export const useInnerPageHeaderStyles = makeStyles<Theme, Props>(() => ({
    pageTitleBox: {
        display: 'flex',
        alignItems: 'center',
        padding: '18px',
        backgroundColor: (props) => props.isDesktop ? '#fafafa' : colors.primary,
        position: 'relative',
        minHeight: '80px',
        marginLeft: (props) => props.isDesktop ? '260px': '0',
    },
    backButton: {
        width: '36px',
        height: '36px',
        backgroundColor: (props) => props.isDesktop ? colors.darkGray : '#64AD63',
        borderRadius: '9px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        position: 'absolute',
        left: '15px',
    },
    exitButton: {
        width: '36px',
        height: '36px',
        backgroundColor: (props) => props.isDesktop ? colors.error: '#64AD63',
        borderRadius: '9px',
        border: 'none',
        color: '#fff',
        cursor: 'pointer',
        position: 'absolute',
        right: '15px',
    },
    pageTitleDetail:{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: (props) => props.isDesktop ? 'flex-start': 'center',
        paddingLeft: '36px',
        paddingRight: '36px',
        textAlign: 'center',
    },
    pageTitle:{
        fontSize: (props) => props.isDesktop ? '24px': '16px',
        fontWeight: 500,
        color: (props) => props.isDesktop ? colors.black : colors.white,
        marginLeft: (props) => props.isDesktop ? '15px' : 0,
        lineHeight: 'initial',
    },
    subtitle: {
        fontSize: '15px',
        fontWeight: 500,
        color: colors.white,
        lineHeight: 'initial',
        marginTop: '7px',
        display: (props) => props.isDesktop ? 'none': 'block',
    },
    pr0:{
        paddingRight: 0
    },
    headerTitle:{
        marginLeft: (props) => props.isDesktop ? '260px': '0',
    },
    stepDeskTitle: {
        margin: '78px auto 20px auto',
        fontSize: '20px',
        fontWeight: 500,
        color: colors.black,
        maxWidth: '1040px',
        padding: '0px 24px'
    },
}));
