/* eslint-disable @typescript-eslint/no-empty-function */
import { ZoomOutMapOutlined } from '@mui/icons-material';
import { useDocumentUploaderStyles } from 'modules/common/components/document-uploader/document-uploader.styles';
import { colors } from 'modules/common/utils/colors';
import React, { FunctionComponent } from 'react';

interface IDocumentUploaderProps extends React.HTMLProps<HTMLDivElement> {
  title: string;
  subtitle: string;
  accept: string;
  field: string;
  isUploaded: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  children?: React.ReactNode;
}

interface IAddDocumentUploaderProps {
  title: string;
  field: string;
  accept: string;
  isUploaded: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

const AddDocumentUploader: FunctionComponent<IAddDocumentUploaderProps> = ({
  title,
  field,
  isUploaded,
  onChange,
  onBlur,
  accept,
}) => {
  const classes = useDocumentUploaderStyles();
  const photoSrc = isUploaded ? '/static/icons/photo-white.svg' : '/static/icons/photo-green.svg';
  const backgroundColor = isUploaded ? colors.primary : colors.gray;
  const color = isUploaded ? colors.white : colors.black;
  return (
    <label style={{ backgroundColor }} htmlFor={field} className={classes.addDocumentContainer}>
      <input type="file" name={field} id={field} hidden onChange={onChange} onBlur={onBlur} accept={accept} />
      <img className={classes.addDocumentPhotoIcon} src={photoSrc} alt="photo icon" />
      <p style={{ color }} className={classes.addDocumentLabel}>
        {title}
      </p>
      {!isUploaded && (
        <img className={classes.addDocumentPlusIcon} src="/static/icons/plus-icon-v2.svg" alt="plus icon" />
      )}
    </label>
  );
};

export const DocumentUploader: FunctionComponent<IDocumentUploaderProps> = ({
  title,
  subtitle,
  field,
  isUploaded = false,
  onChange = () => {},
  onBlur = () => {},
  accept,
  children,
  ...rest
}) => {
  const classes = useDocumentUploaderStyles();
  return (
    <div className={classes.documentUploaderContainer} {...rest}>
      <h2 className={classes.title}>{title}</h2>
      <div className={classes.fileUploaderBox}>
        <input type="file" name={field} id={field} onChange={onChange} onBlur={onBlur} accept={accept} />
        <ZoomOutMapOutlined className={classes.dragDropIcon}/>
        <h6 className={classes.dragDropTitle}>Drag and drop here</h6>
      </div>
      <AddDocumentUploader
        title={subtitle}
        field={field}
        isUploaded={isUploaded}
        onChange={onChange}
        onBlur={onBlur}
        accept={accept}
      />
      {children}
    </div>
  );
};
