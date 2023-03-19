import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useLanguageSwitcherStyles } from 'layouts/auth/partials/language-switcher/language-switcher.styles';
import { useMenuAnchor } from 'modules/common/hooks';
import { useLocales } from 'modules/locale';
import { LanguageLink } from 'modules/locale/components/language-link';
import { LanguagesMenu } from 'modules/locale/components/languages-menu';
import { FunctionComponent } from 'react';
import { CircleFlag } from 'react-circle-flags';

export interface LanguageSwitcherInterface {}

export const LanguageSwitcher: FunctionComponent<LanguageSwitcherInterface> = () => {
  const [anchorEl, onOpen, onClose] = useMenuAnchor();
  const { localeOption } = useLocales();
  const classes = useLanguageSwitcherStyles();
  const open = Boolean(anchorEl);

  return (
    <>
      <LanguageLink open={open} onClick={onOpen}>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <Grid item>
            <Avatar sx={{ backgroundColor: 'transparent' }}>
              <CircleFlag countryCode={localeOption.flagCode} height="16" width="16" />
            </Avatar>
          </Grid>
          <Grid item className={classes.shortLabel}>
            {localeOption.shortLabel}
          </Grid>
        </Grid>
      </LanguageLink>
      <LanguagesMenu anchorEl={anchorEl} onClose={onClose} />
    </>
  );
};
