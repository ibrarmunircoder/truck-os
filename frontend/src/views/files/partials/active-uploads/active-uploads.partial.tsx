import CachedIcon from '@mui/icons-material/Cached';
import CancelIcon from '@mui/icons-material/CancelOutlined';
import CancelIconRounded from '@mui/icons-material/CancelRounded';
import CheckIcon from '@mui/icons-material/CheckCircleOutlineRounded';
import CloseIcon from '@mui/icons-material/CloseRounded';
import { Grid, IconButton, LinearProgress, Tooltip, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'modules/common/hooks';
import { ActiveUploadStatusEnum } from 'modules/file/enums';
import { UserFileListActiveUploadsInterface } from 'modules/user-files/user-files.slice';
import React, { ReactElement } from 'react';
import { useUserFileUploader } from 'views/files/hooks/use-user-file-uploader.hook';
import { useActiveUploadsStyles } from 'views/files/partials/active-uploads/active-uploads.styles';

interface ActiveUploadsPartialInterface {
  files: UserFileListActiveUploadsInterface[];
}

export const ActiveUploadsPartial = (props: ActiveUploadsPartialInterface): ReactElement => {
  const classes = useActiveUploadsStyles(props);
  const { removeActiveUploads, cancelActiveUpload, restartFailedUpload } = useUserFileUploader();
  const theme = useTheme();
  const { t } = useTranslation();
  const { files } = props;

  return (
    <div className={classes.root} data-cy="active-uploads-partial-root">
      <Grid container justifyContent="space-between">
        <Typography className={classes.title}>{t('upload.in-progress')}</Typography>
        <CloseIcon onClick={removeActiveUploads} className={classes.dismissButton} />
      </Grid>

      <Grid container>
        {files.map((file, index) => (
          <Grid container key={index} justifyContent="space-between" alignItems="center" className={classes.uploadRow}>
            <Grid item xs={5} className={classes.fileNameWrap}>
              <Typography
                variant="body1"
                className={classes.fileName}
                color={theme.palette.grey[500]}
                component="div"
                title={file.name}
              >
                {file.name}
              </Typography>
            </Grid>

            <Grid item xs={5} className={classes.progressWrap} title={t('upload-failure', { context: file.error })}>
              {file.status === ActiveUploadStatusEnum.SUCCESS && <CheckIcon color="success" />}
              {file.status === ActiveUploadStatusEnum.CANCELLED && <CancelIcon color="error" />}
              {file.status === ActiveUploadStatusEnum.UPLOADING && (
                <div className={classes.progressWrap}>
                  <LinearProgress
                    variant="determinate"
                    color="secondary"
                    value={file.percentage}
                    classes={{ root: classes.progressBar }}
                  />

                  <IconButton
                    data-cy="active-uploads-partial-cancel-upload-btn"
                    color="inherit"
                    disabled={file.percentage >= 99}
                    classes={classes.cancelUploadBtn}
                    onClick={() => cancelActiveUpload(file.temporaryId)}
                  >
                    <CancelIconRounded />
                  </IconButton>
                </div>
              )}
              {file.status === ActiveUploadStatusEnum.FAILED && (
                <>
                  <div className={classes.failureMessageWrap}>
                    <Typography classes={classes.failureMessage} variant="body1">
                      {t('upload-failure')}
                    </Typography>
                  </div>
                  <Tooltip title={t('files.retry-upload')}>
                    <CachedIcon classes={classes.restartIcon} onClick={() => restartFailedUpload(file.temporaryId)} />
                  </Tooltip>
                </>
              )}
            </Grid>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
