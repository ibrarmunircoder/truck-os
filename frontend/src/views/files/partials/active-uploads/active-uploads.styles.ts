import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useActiveUploadsStyles = roqMakeStyles((theme: Theme) => ({
  root: {
    width: 456,
    background: '#FFFFFF',
    borderRadius: '0.5rem',
    boxShadow: '0 0.25rem 1rem rgba(13, 28, 70, 0.15)',
    position: 'absolute',
    bottom: '1.5rem',
    right: '1.5rem',
    padding: '1.5rem',
    maxHeight: 300,
    overflowY: 'auto',
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
    color: theme.palette.grey[900],
  },
  uploadRow: {
    marginTop: '0.75rem',
    '&:first-child': {
      marginTop: '1.5rem',
    },
  },
  failureMessageWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  'failureMessage--root': {
    color: theme.palette.error.main,
  },
  'restartIcon--root': {
    color: theme.palette.common.black,
    cursor: 'pointer',
  },
  progressWrap: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: '100%',
  },
  progressBar: {
    marginRight: '0.5rem',
    width: '100%',
  },
  fileNameWrap: {
    display: 'flex',
    alignItems: 'center',
  },
  fileName: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    display: 'inline-block',
    textOverflow: 'ellipsis',
    width: '100%',
  },
  'cancelUploadBtn--root': {
    padding: 0,
    minWidth: 'unset',
    background: 'none',
  },
  'cancelUploadBtn--colorInherit': {
    color: `${theme.palette.common.black} !important`,
    cursor: 'pointer',
    fontSize: 20,
  },
  dismissButton: {
    color: theme.palette.common.black,
    cursor: 'pointer',
  },
}));
