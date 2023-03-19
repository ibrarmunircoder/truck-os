import { Chip } from '@mui/material';
import { useTranslation } from 'modules/common/hooks';
import { useFileTypeChipStyles } from 'modules/file/components/file-type-chip/file-type-chip.styles';
import { FileTypeEnum } from 'modules/file/enums';
import React, { FunctionComponent } from 'react';

export interface FileTypeChipInterface {
  type?: keyof typeof FileTypeEnum;
}

export const FileTypeChip: FunctionComponent<FileTypeChipInterface> = ({ type }) => {
  const classes = useFileTypeChipStyles();
  const { t } = useTranslation();
  /*
    We have this commented on purpose, for translations
    t('file.public')
    t('file.private')
  */
  const translationKeys = {
    public_file: 'file.public',
    private_file: 'file.private',
  };

  const normalizedStatus = type.toLocaleLowerCase();
  const label = translationKeys[normalizedStatus];
  const className = [classes.statusChip, classes[`${normalizedStatus}Chip`]].join(' ');
  return (
    <Chip data-cy={`file-type-chip-${normalizedStatus}`} component="span" label={t(label)} className={className} />
  );
};
