import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useInvoiceDocumentDownloaderStyles = makeStyles(() => ({
  invoiceDocumentDownloader: {
    width: '157px',
    height: '72px',
    border: `1px solid ${colors.lightGray}`,
    boxShadow: '0px 20px 30px rgba(0, 0, 0, 0.05)',
    borderRadius: '10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:first-child': {
      marginRight: '25px',
    },
  },
  invoiceDocumentDownloaderLabel: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '18px',
    color: colors.darkGray,
    margin: '10px 0px 18px 0px',
  },
  invoiceDocumentDownloaderButtonIcon: {
    background: 'transparent',
    padding: 0,
    margin: 0,
    border: 'none',
    cursor: 'pointer',
    '&:not(:last-child)': {
      marginRight: '24px',
    },
  },
}));
