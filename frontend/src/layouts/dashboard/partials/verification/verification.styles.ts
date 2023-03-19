import { makeStyles } from '@mui/styles';

export const useVerificationStyles = makeStyles(() => ({
    verificationHeader: {
        backgroundColor: '#000000',
        boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
        padding: '8px 9px 9px 16px',
        '& p': {
            color: '#ffffff',
            fontSize: '12px',
            fontWeight: 500,
            lineHeight: '20px',
            letterSpacing: '0.3px',
            '& a': {
                color: '#ffffff',
                textDecoration: 'underline'
            }
        }
    },
}));





