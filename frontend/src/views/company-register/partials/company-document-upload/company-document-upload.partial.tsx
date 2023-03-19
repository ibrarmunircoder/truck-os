import { Box, Grid } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { useFormikContext } from 'formik';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { DocumentUploader } from 'modules/common/components/document-uploader';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import React, { FunctionComponent } from 'react';
import { useAccountFileUpload } from 'views/company-register/hooks';
import { useCompanyDocumentUploadStyles } from 'views/company-register/partials/company-document-upload/company-document-upload.styles';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { ICompanyDocumentUploadFormModel } from 'views/company-register/utils';

interface ICompanyDocumentUploadProps {
  formModel: ICompanyDocumentUploadFormModel;
}

export const CompanyDocumentUpload: FunctionComponent<ICompanyDocumentUploadProps> = ({
  formModel,
}): React.ReactElement => {
  const { companyDocument } = formModel.formField;
  const classes = useCompanyDocumentUploadStyles();
  const { handleBlur, values } = useFormikContext();
  const isDesktop = useMatchMediaQuery();
  const { t } = useTranslation();
  const { handleFileSelected, isUploading, handleClose, uploadStatus, resetStatusError } = useAccountFileUpload();

  return (
    <Box className={classes.companyDocumentUploadContainer}>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1, left: isDesktop ? '260px' : 0 }}
        open={isUploading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container className={classes.companyDocumentUploadHeader}>
        <Grid item xs={12}>
          <CompanyHeader title={t('company-register.step2.title')} />
        </Grid>
      </Grid>
      <Grid container columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <Box>
            {uploadStatus?.type === 'success' ? (
              <FormAlert
                open={uploadStatus?.type === 'success'}
                message={uploadStatus?.message}
                severity={'success'}
                autoHideDuration={3000}
                onClose={resetStatusError}
              />
            ) : (
              <FormAlert
                open={uploadStatus?.type === 'error'}
                message={uploadStatus?.message}
                severity={'error'}
                autoHideDuration={3000}
                onClose={resetStatusError}
              />
            )}
            <DocumentUploader
              title={t('company-register.step2.document-uploader-title')}
              subtitle={
                values[companyDocument.name].length > 0
                  ? t('company-register.step2.document-uploader-sub-title-success')
                  : t('company-register.step2.document-uploader-sub-title')
              }
              field="document"
              isUploaded={values[companyDocument.name].length > 0}
              onChange={handleFileSelected}
              onBlur={handleBlur}
              accept="application/pdf"
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
