import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';

export interface ScreenFrameClasses {
  image?: string;
}

export const useScreenFrameStyles = roqMakeStyles<ScreenFrameClasses>((theme: Theme) => ({
  image: {
    [theme.breakpoints.down('lg')]: {
      display: 'none',
    },
    [theme.breakpoints.up('lg')]: {
      maxInlineSize: '100%',
      blockSize: 'auto',
      width: '100%',
    },
  },
}));
