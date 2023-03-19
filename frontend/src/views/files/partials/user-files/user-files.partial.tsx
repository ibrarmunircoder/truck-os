import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Download from '@mui/icons-material/Download';
import { Box, Button, Grid, Paper, Tooltip, Typography } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { FileInterface } from 'modules/user-files/interfaces';
import React, { ReactElement, useRef } from 'react';
import { useDropzone } from 'react-dropzone';
import { useUserFileOperations } from 'views/files/hooks';
import { useUserFilesUpload } from 'views/files/hooks/use-user-files-upload.hook';
import { UserFileDeleteConfirmation } from 'views/files/partials/user-file-delete-confirmation/user-file-delete-confirmation.partial';
import { useUserFilesStyles } from 'views/files/partials/user-files/user-files.styles';
import { UserFilesTablePartial } from 'views/files/partials/user-files-table/user-files-table.partial';

const confirmationsByOperationName = {
  deleteFiles: ({ onCancel, onConfirm, params, isLoading }) => (
    <UserFileDeleteConfirmation
      filesToDelete={params}
      onCancel={onCancel}
      onConfirm={onConfirm}
      isLoading={isLoading}
    />
  ),
};

const alertsByOperationName = {
  deleteFiles: ({ params, status, resetState, t }) => (
    <FormAlert
      open
      error={status.error}
      message={
        params.length > 1
          ? t('files.deleted_successfully_bulk')
          : t('files.deleted_successfully', { fileName: params[0].name })
      }
      autoHideDuration={3000}
      onClose={resetState}
    />
  ),
};

export const UserFilesPartial = (): ReactElement => {
  const classes = useUserFilesStyles();
  const { handleFileUpload, handleSelectedFiles } = useUserFilesUpload();
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const {
    deleteFiles,
    downloadFiles,
    selectUserFiles,
    selectedUserFiles,
    currentOperation,
    onConfirm,
    onCancel,
    resetState,
  } = useUserFileOperations({});

  const handleUploadFileButtonClick = () => {
    fileInputRef.current.click();
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleFileUpload,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <Paper classes={classes.paper}>
      <Grid container justifyContent="space-between" className={classes.topSection}>
        <Typography variant="h6" color="primary" className={classes.topSectionTitle}>
          {t('title_files')}
        </Typography>

        <Box className={classes.actionButtonsWrap}>
          {!!selectedUserFiles.length && (
            <>
              <Tooltip
                title={t('files.delete-file')}
                onClick={() => deleteFiles(selectedUserFiles)}
                data-cy="user-file-partial-selected-files-delete-btn"
              >
                <Button variant="outlined">
                  <DeleteIcon />
                </Button>
              </Tooltip>

              <Tooltip
                title={t('files.download-file')}
                onClick={() => downloadFiles(selectedUserFiles)}
                data-cy="user-file-partial-selected-files-download-btn"
              >
                <Button variant="outlined">
                  <Download />
                </Button>
              </Tooltip>
            </>
          )}

          <Button
            data-cy="user-files-partial-upload-btn"
            variant="contained"
            onClick={handleUploadFileButtonClick}
            startIcon={<AddIcon />}
          >
            {t('upload-file-cta')}
          </Button>
        </Box>
      </Grid>

      <div {...getRootProps()} className={classes.dragZoneWrapper} data-cy="user-file-partial-dropzone-input">
        {isDragActive && (
          <div className={classes.dragZone}>
            <input {...getInputProps()} />
            <Typography className={classes.dragText}>{t('drop-uploads-cta')}</Typography>
          </div>
        )}

        {!isDragActive && (
          <UserFilesTablePartial
            onFileDelete={(file: FileInterface) => deleteFiles([file])}
            onFileDownload={(file: FileInterface) => downloadFiles([file])}
            onFilesSelection={selectUserFiles}
            selectedUserFiles={selectedUserFiles}
          />
        )}
      </div>

      <input
        data-cy="user-files-partial-upload-file-input"
        multiple
        type="file"
        ref={fileInputRef}
        className={classes.fileInput}
        onChange={handleSelectedFiles}
      />

      {!!currentOperation?.status
        ? alertsByOperationName[currentOperation.name]?.({ ...currentOperation, resetState, t })
        : !!currentOperation?.confirmable &&
          confirmationsByOperationName[currentOperation.name]?.({ onConfirm, onCancel, ...currentOperation })}
    </Paper>
  );
};
