import LinkIcon from '@mui/icons-material/Link';
import LockIcon from '@mui/icons-material/Lock';
import PublicIcon from '@mui/icons-material/Public';
import { Button, Grid, Paper, TextField } from '@mui/material';
import { ActionOverlay, ActionOverlayProps } from 'modules/action-overlay/components/action-overlay';
import { ActionOverlayButtons } from 'modules/action-overlay/components/action-overlay-buttons';
import { getFileExtension } from 'modules/file/utils';
import { FormAlert } from 'modules/forms/components';
import { FileVisibilityStatusEnum } from 'modules/user-files/enums';
import { FileInterface } from 'modules/user-files/interfaces';
import React, { FunctionComponent, ReactElement, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useCopyToClipboard } from 'react-use';
import { FileOperationNameEnum } from 'views/files/enums';
import { useUserFileOperations } from 'views/files/hooks';
import { useUserFileEdit } from 'views/files/hooks/use-user-file-edit.hook';
import { useUserFileEditStyles } from 'views/files/hooks/use-user-file-edit-styles.hook';
import { useUserFileUpdateForm } from 'views/files/hooks/use-user-file-update-form.hook';
import { UserFileChangeVisibilityConfirmation } from 'views/files/partials/user-file-change-visibility-confirmation/user-file-change-visibility-confirmation.partial';

interface UserFileEditFormActionOverlayInterface extends ActionOverlayProps<null> {
  file: FileInterface;
  onSuccess?: () => void;
  onClose: () => void;
}

/*
  t('file.made-private-successfully')
  t('file.made-public-successfully')
*/
const operationNameSuccessMessageMapping = {
  [FileOperationNameEnum.makeFilePrivate]: 'file.made-private-successfully',
  [FileOperationNameEnum.makeFilePublic]: 'file.made-public-successfully',
};
const UserFileEditFormActionOverlay: FunctionComponent<UserFileEditFormActionOverlayInterface> = (props) => {
  const { file } = props;
  const classes = useUserFileEditStyles();
  const { handleSubmit, status, handleChange, values, resetStatus, visibleErrors, dirty, isValid, isSubmitting } =
    useUserFileUpdateForm(file);
  const { t } = useTranslation();
  const [, copyToClipboard] = useCopyToClipboard();
  const [showMakePublicDialog, setShowMakePublicDialog] = useState(false);
  const [showMakePrivateDialog, setShowMakePrivateDialog] = useState(false);
  const [showUrlIsCopied, setShowUrlIsCopied] = useState(false);
  const fileExtension = getFileExtension(file.name);

  const onFileChangedToPublicSuccess = useCallback(
    (result, operationName) => {
      if (operationName === FileOperationNameEnum.makeFilePublic) {
        copyToClipboard(result.url);
        setShowMakePublicDialog(false);
      } else if (operationName === FileOperationNameEnum.makeFilePrivate) {
        setShowMakePrivateDialog(false);
      }
    },
    [showMakePublicDialog, showMakePrivateDialog],
  );

  const { makeFilePublic, currentOperation, resetState, makeFilePrivate } = useUserFileOperations({
    onSuccess: onFileChangedToPublicSuccess,
  });
  const handleClose = () => {
    setShowUrlIsCopied(false);
  };

  const handleCopyUrl = () => {
    copyToClipboard(file.url);
    setShowUrlIsCopied(true);
  };

  const handleMakePublic = () => {
    setShowMakePublicDialog(true);
  };
  const handleMakePrivate = () => {
    setShowMakePrivateDialog(true);
  };

  return (
    <>
      <FormAlert
        data-cy="user-file-edit-form-edit-alert"
        open={!!status}
        message={t('file.edit.success')}
        error={status?.error}
        onClose={resetStatus}
      />
      <FormAlert
        data-cy="user-file-edit-form-make-public-alert"
        open={!!currentOperation?.status}
        message={t(operationNameSuccessMessageMapping[currentOperation?.name], { fileName: file.name })}
        onClose={resetState}
      />
      <FormAlert
        open={showUrlIsCopied}
        partialSuccess={true}
        onClose={handleClose}
        message={t('file.copy-url-link', { fileName: file.name })}
      />
      <Paper classes={classes.paper}>
        <ActionOverlay
          config={{
            title: t('file.edit.title'),
            subTitle: t('file.edit-subtitle'),
          }}
          {...props}
        >
          <Grid
            container
            direction="column"
            justifyContent="space-between"
            alignItems="stretch"
            height="100%"
            component="form"
            onSubmit={handleSubmit}
            data-cy="user-file-edit-form-action-overlay-grid"
          >
            <Grid item flexGrow={2}>
              <Grid container rowSpacing={2} columnSpacing={3} className={classes.formSection}>
                <Grid item sm={12} md={6}>
                  <TextField
                    name={'name'}
                    value={values?.name}
                    label={t('file.edit.name-field-label')}
                    type="text"
                    variant="standard"
                    helperText={visibleErrors.name}
                    error={Boolean(visibleErrors.name)}
                    onChange={handleChange}
                    fullWidth
                    focused
                  />
                </Grid>

                <Grid item sm={12} md={6}>
                  <TextField
                    name="extension"
                    value={`.${fileExtension}`}
                    label={t('file.extension')}
                    type="text"
                    variant="standard"
                    fullWidth
                    focused
                    disabled
                  />
                </Grid>
              </Grid>

              <Grid container rowSpacing={2} columnSpacing={3} className={classes.formSection}>
                <Grid item xs={12} pt={20}>
                  {!!file.isPublic ? (
                    <Grid container rowSpacing={2} columnSpacing={2}>
                      <Grid item pt={20}>
                        <Button
                          data-cy="user-file-edit-form-action-overlay-copy-btn"
                          variant="outlined"
                          color="info"
                          onClick={handleCopyUrl}
                          startIcon={<LinkIcon />}
                        >
                          {t('file.copy-file-public-link')}
                        </Button>
                      </Grid>
                      <Grid item pt={20}>
                        <Button variant="outlined" color="info" onClick={handleMakePrivate} startIcon={<LockIcon />}>
                          {t('file.make-file-private')}
                        </Button>
                      </Grid>
                    </Grid>
                  ) : (
                    <Button
                      data-cy="user-file-edit-form-action-overlay-public-btn"
                      variant="outlined"
                      color="info"
                      onClick={handleMakePublic}
                      startIcon={<PublicIcon />}
                    >
                      {t('file.make-file-public')}
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>

            <Grid item flexShrink={1}>
              <ActionOverlayButtons
                submitButton={
                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    type="submit"
                    disabled={!isValid || !dirty || isSubmitting}
                    data-cy="user-file-edit-form-action-overlay-submit-btn"
                  >
                    {t('save')}
                  </Button>
                }
                cancelButton={
                  <Button
                    data-cy="user-file-edit-form-action-overlay-cancel-btn"
                    variant="outlined"
                    size="large"
                    type="button"
                    onClick={props.onClose}
                    color="error"
                  >
                    {t('cancel')}
                  </Button>
                }
                onCancel={props.onClose}
                displaySubmitButton={true}
                isSubmitting={isSubmitting}
              />
            </Grid>
          </Grid>
        </ActionOverlay>
      </Paper>

      {showMakePublicDialog && (
        <UserFileChangeVisibilityConfirmation
          data-cy="user-file-make-public-confirmation"
          visibilityStatus={FileVisibilityStatusEnum.public}
          file={file}
          isLoading={currentOperation?.isLoading}
          onConfirm={() => {
            makeFilePublic(file);
          }}
          onCancel={() => {
            setShowMakePublicDialog(false);
          }}
        />
      )}

      {showMakePrivateDialog && (
        <UserFileChangeVisibilityConfirmation
          visibilityStatus={FileVisibilityStatusEnum.private}
          file={file}
          isLoading={currentOperation?.isLoading}
          onConfirm={() => {
            makeFilePrivate(file);
          }}
          onCancel={() => {
            setShowMakePrivateDialog(false);
          }}
        />
      )}
    </>
  );
};

interface UserFileEditPartialInterface extends ActionOverlayProps<null> {
  fileId: string;
  onSuccess?: () => void;
  onClose: () => void;
}

export const UserFileEditPartial = (props: UserFileEditPartialInterface): ReactElement => {
  const { fileId } = props;
  const { file } = useUserFileEdit(fileId as string);

  if (!file) {
    return null;
  }

  return <UserFileEditFormActionOverlay file={file} {...props} />;
};
