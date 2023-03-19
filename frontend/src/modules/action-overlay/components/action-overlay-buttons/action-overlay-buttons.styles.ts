import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export interface ActionOverlayButtonsClasses {
  wrapper: string;
}

export const useActionOverlayButtonsStyles = roqMakeStyles<ActionOverlayButtonsClasses>((theme: Theme) => ({
  wrapper: {
    zIndex: theme.zIndex.drawer + 2,
    position: 'sticky',
    bottom: 0,
    left: 0,
    padding: theme.spacing(5, 0),
  }
}));
