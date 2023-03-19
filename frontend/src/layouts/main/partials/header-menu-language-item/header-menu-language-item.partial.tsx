import { useLocales } from 'modules/locale';
import { LanguageLink } from 'modules/locale/components/language-link';
import { forwardRef } from 'react';

export type HeaderMenuLanguageItemProps = {
  open: boolean;
  onClick: () => void;
};

export const HeaderMenuLanguageItem = forwardRef<HTMLAnchorElement, HeaderMenuLanguageItemProps>((props, ref) => {
  const { localeOption } = useLocales();

  return (
    <LanguageLink {...props} inheritColor ref={ref}>
      {localeOption.shortLabel}
    </LanguageLink>
  );
});

HeaderMenuLanguageItem.displayName = 'HeaderMenuLanguageItem';
