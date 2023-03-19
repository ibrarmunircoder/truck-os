import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React, { FunctionComponent } from 'react';
import { OrderFileUploadKeysEnum } from 'views/invoice-creation/enum';
import { useInvoiceDocuments } from 'views/invoice-details/hooks';
import { OrderResponseInterface } from 'views/invoice-details/interfaces';
import { InvoiceDocumentDownloader } from 'views/invoice-details/partials';
import { useInvoiceDocumentsStyles } from 'views/invoice-details/partials/invoice-documents/invoice-documents.styles';

interface InvoiceDocumentPropsInterface {
  order: OrderResponseInterface;
}

export const InvoiceDocuments: FunctionComponent<InvoiceDocumentPropsInterface> = ({ order }): React.ReactElement => {
  const { handleDownload, handleEmailOpen } = useInvoiceDocuments();
  const classes = useInvoiceDocumentsStyles();
  const invoiceFile = order.orderFiles.find(
    (file) => file.fileCategory === OrderFileUploadKeysEnum.ORDER_FILE_INVOICE_CATEGORY,
  );
  const podFile = order.orderFiles.find(
    (file) => file.fileCategory === OrderFileUploadKeysEnum.ORDER_FILE_POD_CATEGORY,
  );
  return (
    <Box>
      <Typography className={classes.invoiceDocumentsTitle} component="h3">
        Documents
      </Typography>
      <Box className={classes.invoiceDocumentsDownloaderWrapper}>
        <InvoiceDocumentDownloader
          label="Invoice"
          handleDownloadClick={handleDownload(invoiceFile?.url, invoiceFile?.name)}
          handleMailOpenClick={handleEmailOpen}
        />
        <InvoiceDocumentDownloader
          label="POD"
          handleDownloadClick={handleDownload(podFile?.url, podFile?.name)}
          handleMailOpenClick={handleEmailOpen}
        />
      </Box>
    </Box>
  );
};
