import { Theme } from '@mui/material';
import { TooltipClasses } from '@mui/material/Tooltip';
import { roqMakeStyles } from 'modules/common/utils';

export interface ValidatedPasswordFieldClasses {
  tooltip: TooltipClasses;
  passwordField: string;
}
export const useValidatedPasswordFieldStyles = roqMakeStyles<ValidatedPasswordFieldClasses>((theme: Theme) => ({
  'tooltip--tooltip': ({ width }: { width: number }) => ({
    width: width + 2,
    margin: '0 !important',
    background: 'none',
    color: theme.palette.grey[500],
    maxWidth: 'none',
    padding: theme.spacing(1, 0)
  }),
  'passwordField': {
    '& > div' : {
      backgroundColor: '#FFFFFF'
    }
  }
}));
