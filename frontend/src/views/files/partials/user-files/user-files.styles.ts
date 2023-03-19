import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export const useUserFilesStyles = roqMakeStyles((theme: Theme) => ({
  'paper--root': {
    boxShadow: '0 0.25rem 1rem rgb(13 28 70 / 5%)',
    borderRadius: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  topSection: {
    padding: '1.5rem 2rem',
  },
  topSectionTitle: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
    color: theme.palette.primary.main,
  },
  fileInput: {
    display: 'none',
  },
  dragZoneWrapper: {
    flex: 1,
    display: 'flex',
    '& .MuiTableRow-head': {
      background: 'orange !important',
      color: 'purple !important',
      fontWeight: 600,
      '& .MuiTableCell-head:first-child': {
        paddingLeft: '1.25rem',
      },
      '& :nth-child(2):before': {
        borderWidth: 0,
      },
    },
    '& .MuiTableBody-root .MuiTableCell-root:first-child': {
      paddingLeft: '1.25rem',
    },
  },
  dragZone: {
    flex: 1,
    display: 'flex',
    background: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[700],
    border: `2px dashed ${theme.palette.grey[300]}`,
    boxSizing: 'border-box',
    borderRadius: '0.25rem',
    margin: '0 2rem 1.5rem',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragText: {
    fontSize: '1.25rem',
    lineHeight: '1.75rem',
    letterSpacing: 0.15,
  },
  actionButtonsWrap: {
    display: 'flex',
    alignItems: 'center',
    height: '2rem',
    columnGap: theme.spacing(1.5),
  },
  'bulkFileDeleteButton--root': {
    marginRight: '0.875rem'
  },
  deleteModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 305,
    padding: '1.5rem',
    wordWrap: 'break-word',
    boxShadow: '0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 0.375rem 1.875rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem rgba(0, 0, 0, 0.2)',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.25,
    background: theme.palette.background.default,
  },
  deleteMessage: {
    marginBottom: '1rem',
    color: theme.palette.text.primary,
  },
}));
