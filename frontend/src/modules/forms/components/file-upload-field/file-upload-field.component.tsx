import ClearIcon from '@mui/icons-material/Clear';
import { Button, FormControl, FormHelperText, FormLabel, IconButton, Typography } from '@mui/material';
import { useFileUploadFieldStyles } from 'modules/forms/components/file-upload-field/file-upload-field.styles';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { DropEvent, DropzoneOptions, FileRejection, useDropzone } from 'react-dropzone';

interface IProps extends Omit<DropzoneOptions, 'onDrop'> {
  label: string;
  variant: 'filled' | 'outlined' | 'standard';
  value: (File | { id: string; name: string })[];
  error?: boolean;
  helperText?: React.ReactNode;
  onChange: (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => void;
  onRemove: (fileIndex: number, file: File | { id: string; name: string }) => void;
}

export const FileUploadField: React.FC<IProps> = (props) => {
  const { label, variant, value = [], error, helperText, onChange, onRemove, disabled, ...dropzoneOptions } = props;
  const { t } = useTranslation();
  const [fileDropError, setFileDropError] = useState<string>('');

  const onDrop = (acceptedFiles: File[], fileRejections: FileRejection[], event: DropEvent) => {
    // handle drop errors/rejections
    const allDropErrors = fileRejections.map((f) => f.errors.map((e) => e.code)).flat();
    const dropErrors = [...new Set(allDropErrors)];
    let errorMsg = '';
    if (dropErrors.includes('file-invalid-type')) {
      errorMsg += t('file-uploader.errors.file-invalid-type') + ' ';
    }
    if (dropErrors.includes('too-many-files')) {
      errorMsg += t('file-uploader.errors.too-many-files') + ' ';
    }
    if (dropErrors.includes('file-too-large')) {
      errorMsg += t('file-uploader.errors.file-too-large') + ' ';
    }
    setFileDropError(errorMsg.trim());

    // pass values on to the onChange handler
    onChange(acceptedFiles, fileRejections, event);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    noKeyboard: true,
    disabled,
    ...dropzoneOptions,
  });

  const classes = useFileUploadFieldStyles();
  return (
    <FormControl fullWidth variant={variant} error={error || Boolean(fileDropError)}>
      <FormLabel>{label}</FormLabel>
      <div {...getRootProps()} className={classes.dragZoneWrapper}>
        <Button variant="contained" color="primary" disabled={disabled}>
          Upload File
          <input {...getInputProps()} />
        </Button>
        {isDragActive || !value.length ? (
          <div className={classes.dragZone}>
            <Typography className={classes.dragText}>{t('drop-uploads-cta')}</Typography>
          </div>
        ) : (
          <div>
            {value.map((f, i) => (
              <div key={`${f.name}-${i}`} className={classes.fileBox}>
                <div className={classes.fileName}>{f.name}</div>
                <IconButton
                  className={classes.removeBtn}
                  onClick={(e) => {
                    onRemove(i, f);
                    e.stopPropagation();
                  }}
                >
                  <ClearIcon />
                </IconButton>
              </div>
            ))}
          </div>
        )}
      </div>
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
      {fileDropError && <FormHelperText>{fileDropError}</FormHelperText>}
    </FormControl>
  );
};
