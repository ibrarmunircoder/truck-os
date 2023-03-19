import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export const useUserFilesTableStyles = roqMakeStyles((theme: Theme) => ({
  deleteModal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 305,
    padding: '1.5rem',
    wordWrap: 'break-word',
    boxShadow:
      '0 1rem 1.5rem rgba(0, 0, 0, 0.14), 0 0.375rem 1.875rem rgba(0, 0, 0, 0.12), 0 0.5rem 0.625rem rgba(0, 0, 0, 0.2)',
    borderRadius: '0.25rem',
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.25,
    background: theme.palette.background.default,
  },
  fileName: {
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    letterSpacing: 0.2,
    fontWeight: 'normal',
    textDecorationLine: 'underline',
    color: '#4294f7',
  },
  deleteMessage: {
    marginBottom: '1rem',
    color: theme.palette.text.primary,
  },
  tableIcon: {
    color: theme.palette.mode === ThemeEnum.LIGHT ? 'rgba(0, 0, 0, 0.38)' : 'rgba(255, 255, 255, 0.5)',
  },
  longTextCell: {
    display: '-webkit-box',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
  },
}));
