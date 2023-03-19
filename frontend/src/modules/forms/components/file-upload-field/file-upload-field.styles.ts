import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useFileUploadFieldStyles = roqMakeStyles((theme: Theme) => ({
  fileInput: {
    display: 'none',
  },
  dragZoneWrapper: {
    borderBottom: '1px solid #949494',
    paddingBottom: 6,
    marginTop: 6,
  },
  dragZone: {
    flex: 1,
    display: 'flex',
    background: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],
    border: `2px dashed ${theme.palette.grey[300]}`,
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    marginTop: '0.5rem',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 75,
  },
  dragText: {
    fontSize: '1rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
  },
  fileBox: {
    display: 'flex',
    margin: '6px 0',
    alignItems: 'center',
  },
  fileName: {
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    color: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 6,
    padding: '6px 10px',
    marginRight: 8,
    fontSize: 12,
    fontWeight: 500,
  },
  removeBtn: {
    margin: 0,
    padding: 0,
    '& svg': {
      fontSize: '1.2rem',
    },
  },
}));
