import { Theme } from '@mui/material';
import { roqMakeStyles } from 'modules/common/utils';
import { ThemeEnum } from 'modules/theme/enums';

export interface LanguageSwitcherClasses {
  icon?: string;
  shortLabel?: string;
}

export const useLanguageSwitcherStyles = roqMakeStyles<LanguageSwitcherClasses>((theme: Theme) => ({
  shortLabel: {
    fontSize: '14px',
    color: theme.palette.mode === ThemeEnum.LIGHT ? theme.palette.common.black : theme.palette.common.white,
  },
}));
