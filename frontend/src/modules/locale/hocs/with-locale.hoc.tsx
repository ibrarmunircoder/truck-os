/* eslint-disable @typescript-eslint/no-unused-vars */
import {i18n, localeMapping} from 'configuration/app';
import invert from 'lodash/invert';
import {AuthStateInterface} from 'modules/auth';
import {authSelector} from 'modules/auth/selectors';
import {getSelectedLocale, useLocales} from 'modules/locale';
import {useRouter} from "next/router";
import {ComponentType, FunctionComponent, useEffect} from 'react';
import {useSelector} from 'react-redux';

const localeReverseMapping = invert(localeMapping);

/* eslint-disable-next-line @roq/name-of-class-and-function-rule */
export function withLocale<Props>(WrappedComponent: ComponentType<Props>): ComponentType<Props> {
  const withLocaleComponent: FunctionComponent<Props> = (props: Props) => {
    const router = useRouter();
    const {setCurrentLocale, localeOptions, localeOption} = useLocales();
    const {user}: AuthStateInterface = useSelector(authSelector);
    const updateBasedOnNavigatorLanguage = () => {
      // we do browser locale detection only if we are in default locale
      if (localeOption.routerLocale === i18n.defaultLocale) {
        const foundLocaleOption = localeOptions.find((language) => (
          language.id === navigator?.language || language.routerLocale === navigator?.language
        ));
        if (foundLocaleOption) {
          setCurrentLocale(foundLocaleOption.id);
        }
      }
    };
    useEffect(() => {
      const explicitlySelectedLocale = getSelectedLocale();

      if (user && router.isReady) {
        if (user?.locale) {
          setCurrentLocale(explicitlySelectedLocale);
        } else {
          updateBasedOnNavigatorLanguage();
        }
      } else if (router.isReady) {
        if (explicitlySelectedLocale && localeOptions.find((language) => (
          language.id === explicitlySelectedLocale
        ))) {
          setCurrentLocale(explicitlySelectedLocale);
        } else {
          updateBasedOnNavigatorLanguage();
        }
      }

    }, [user, router.isReady]);
    return <WrappedComponent {...props} />;
  };
  return withLocaleComponent;
}
