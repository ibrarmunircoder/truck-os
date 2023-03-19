import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'modules/common/hooks';
import { saveSelectedLocale, useLocales } from 'modules/locale';
import { useLanguagesMenuStyles } from 'modules/locale/components/languages-menu/languages-menu.styles';
import { FunctionComponent, SyntheticEvent, useCallback } from 'react';

export interface LanguagesMenuInterface {
  anchorEl: HTMLElement;
  onClose: (e: SyntheticEvent<HTMLElement>) => void;
}

export const LanguagesMenu: FunctionComponent<LanguagesMenuInterface> = (props) => {
  const { anchorEl, onClose } = props;
  const { localeOptions, setCurrentLocale } = useLocales();

  const router = useRouter();
  const classes = useLanguagesMenuStyles();
  const open = Boolean(anchorEl);

  const handleMenuItemClick = useCallback(
    async (e: SyntheticEvent<HTMLLIElement>) => {
      const { lang: locale } = e.currentTarget.dataset;
      saveSelectedLocale(locale);
      await setCurrentLocale(locale);
      onClose(e);
    },
    [setCurrentLocale],
  );

  return (
    <Menu
      id="languages-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={onClose}
      anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      transformOrigin={{ horizontal: 'right', vertical: 'top' }}
      MenuListProps={{ 'aria-labelledby': 'languages-link' }}
    >
      {localeOptions.map((language) => {
        const Flag = language.flag;

        return (
          <MenuItem
            key={language.id}
            data-lang={language.id}
            data-cy={language.id}
            onClick={handleMenuItemClick}
            selected={router.locale === language.routerLocale}
          >
            <Flag className={classes.icon} title={language.label} /> {language.label}
          </MenuItem>
        );
      })}
    </Menu>
  );
};
