import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import DownloadIcon from 'modules/common/icons/downloader-icon.svg';
import MailIcon from 'modules/common/icons/mail-icon.svg';
import React, { FunctionComponent } from 'react';
import { useInvoiceDocumentDownloaderStyles } from 'views/invoice-details/partials/invoice-document-downloader/invoice-document-downloader.styles';

interface InvoiceDocumentDownloaderPropsInterface {
  label: string;
  handleDownloadClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  handleMailOpenClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const InvoiceDocumentDownloader: FunctionComponent<InvoiceDocumentDownloaderPropsInterface> = ({
  label,
  handleDownloadClick,
  handleMailOpenClick,
}): React.ReactElement => {
  const classes = useInvoiceDocumentDownloaderStyles();
  return (
    <Box className={classes.invoiceDocumentDownloader}>
      <Typography className={classes.invoiceDocumentDownloaderLabel} component="h4">
        {label}
      </Typography>
      <Box>
        <button className={classes.invoiceDocumentDownloaderButtonIcon} type="button" onClick={handleDownloadClick}>
          <DownloadIcon />
        </button>
        <button className={classes.invoiceDocumentDownloaderButtonIcon} type="button" onClick={handleMailOpenClick}>
          <MailIcon />
        </button>
      </Box>
    </Box>
  );
};
