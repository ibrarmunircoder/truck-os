import { makeStyles } from '@mui/styles';
import { colors } from 'modules/common/utils/colors';

export const useInvoiceDocumentsStyles = makeStyles(() => ({
  invoiceDocumentsTitle: {
    fontWeight: 500,
    fontSize: '15px',
    lineHeight: '19px',
    color: colors.black,
  },
  invoiceDocumentsDownloaderWrapper: {
    display: 'flex',
    flexWrap: 'nowrap',
    margin: '20px 0',
  },
}));
