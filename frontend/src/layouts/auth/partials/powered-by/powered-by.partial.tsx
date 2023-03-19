import SvgIcon, { SvgIconClasses } from '@mui/material/SvgIcon';
import Typography, { TypographyClasses } from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import PoweredByDarkIcon from 'modules/common/icons/powered-by.dark.svg';
import PoweredByLightIcon from 'modules/common/icons/powered-by.svg';
import { FunctionComponent, useMemo } from 'react';

export type PoweredByClasses = {
  root?: string;
  label?: TypographyClasses;
  icon?: SvgIconClasses;
};
export interface PoweredByInterface {
  classes?: PoweredByClasses;
  themeName: 'light' | 'dark';
  children?: never;
}

export const PoweredBy: FunctionComponent<PoweredByInterface> = ({ classes = {}, themeName }) => {
  const { t } = useTranslation();
  const PoweredByIcon = useMemo(() => themeName === 'light' ? PoweredByDarkIcon : PoweredByLightIcon, [themeName]);

  return (
    <div className={classes.root}>
      <Typography classes={classes.label} variant="caption">{t('powered-by')}</Typography>
      <SvgIcon classes={classes.icon} component={PoweredByIcon} sx={{ width: 64, height: 20 }} viewBox="0 0 128 40" />
    </div>
  );
};
