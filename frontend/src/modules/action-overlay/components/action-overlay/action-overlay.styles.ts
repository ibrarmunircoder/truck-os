import { ModalClasses, Theme } from '@mui/material';
import { ActionOverlaySize } from 'modules/action-overlay/types';
import { roqMakeStyles } from 'modules/common/utils';

export interface ActionOverlayClasses {
  modal: ModalClasses;
  body: string;
  header: string;
  title: string;
  subTitle: string;
  content: string;
  formContent: string;
}

const getSizeWidth = (size: ActionOverlaySize): string => {
  switch (size) {
    case 'large':
      return `53.75rem`;
    case 'medium':
      return '47.5rem';
    case 'small':
    default:
      return '35rem';
  }
};

export const useActionOverlayStyles = roqMakeStyles<ActionOverlayClasses>((theme: Theme) => ({
  'modal--paper': {
    boxShadow: 'none',
  },
  body: {
    padding: 0,
    margin: 0,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: (props: { size?: ActionOverlaySize }) => getSizeWidth(props.size),
  },
  header: {
    padding: theme.spacing(5),
  },
  title: {
    fontSize: '1.25rem',
    lineHeight: '2rem',
    color: theme.palette.text.primary,
    fontWeight: 500,
  },
  subTitle: {
    fontSize: '1rem',
    marginTop: '0.5rem',
    lineHeight: '1.5rem',
    color: theme.palette.text.secondary,
  },
  content: {
    padding: theme.spacing(0, 5),
    flexGrow: 1,
  },
  formContent: {
    flexGrow: 1,
  },
}));
