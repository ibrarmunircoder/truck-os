import { AuthUserInterface, setAuthUserSettingsState, updateAuthUserAction } from 'modules/auth/auth.slice';
import { authUserSettingsStateSelector } from 'modules/auth/selectors';
import { useTimezones } from 'modules/date-time/hooks';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { UseEnhancedFormikInterface } from 'modules/forms/hooks/use-enhanced-formik.hook';
import { useLocales } from 'modules/locale';
import { LocaleOptionInterface } from 'modules/locale/hooks';
import { saveSelectedLocale } from 'modules/locale/utils/selected-locale';
import { useUserUpdate } from 'modules/users/hooks';
import { SyntheticEvent, useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export interface AppSettingsFormValuesInterface {
  timezone?: string | null;
  locale?: LocaleOptionInterface | null;
}

export interface UseProfileUpdateInterface extends UseEnhancedFormikInterface<AppSettingsFormValuesInterface> {
  onTimezoneChange: (event: SyntheticEvent, timezone: string) => Promise<void>;
  onLocaleChange: (event: SyntheticEvent, option: LocaleOptionInterface) => Promise<void>;
  timezoneOptions: string[];
  localeOptions: LocaleOptionInterface[];
}

export const useAppSettingsForm = (user: AuthUserInterface): UseProfileUpdateInterface => {
  const { updateUser } = useUserUpdate();
  const dispatch = useDispatch();
  const timezoneOptions = useTimezones();
  const { localeOptions, setCurrentLocale, localeOption } = useLocales();
  const formState = useSelector(authUserSettingsStateSelector);

  const onSubmit = useCallback(
    async (values: AppSettingsFormValuesInterface) => {
      resetStatus();
      const data = await updateUser(user.id, { timezone: values.timezone, locale: values.locale?.id });
      await dispatch(updateAuthUserAction(data));
      if (localeOption.id !== values.locale?.id) {
        await setCurrentLocale(values.locale?.id);
        saveSelectedLocale(values.locale?.id)
      }
      return data;
    },
    [user.id, updateUser, localeOption],
  );
  const initialValues = useMemo(
    () => ({
      timezone: user.timezone || null,
      locale: (user.locale && localeOptions.find((l) => l.id === user.locale)) || null,
    }),
    [user.timezone, user.locale],
  );

  const onSubmitSuccess = useCallback(
    (result) => {
      dispatch(
        setAuthUserSettingsState({
          success: !!result,
        }),
      );
    },
    [dispatch],
  );

  const onSubmitError = useCallback(
    (error) => {
      dispatch(
        setAuthUserSettingsState({
          error,
        }),
      );
    },
    [dispatch],
  );

  const formik = useEnhancedFormik<AppSettingsFormValuesInterface>({
    initialValues,
    onSubmit,
    onSubmitSuccess,
    onSubmitError,
  });

  const onTimezoneChange = useCallback(
    async (event: SyntheticEvent, timezone: string) => {
      await formik.setFieldValue('timezone', timezone);
      await formik.submitForm();
    },
    [formik.setValues, formik.submitForm],
  );

  const onLocaleChange = useCallback(
    async (event: SyntheticEvent, locale: LocaleOptionInterface) => {
      await formik.setFieldValue('locale', locale);
      await formik.submitForm();
    },
    [formik.setValues, formik.submitForm, setCurrentLocale],
  );

  const resetStatus = useCallback(() => {
    dispatch(
      setAuthUserSettingsState(null),
    );
  }, [formik.resetStatus, dispatch]);

  return {
    ...formik,
    status: formState,
    resetStatus,
    initialValues,
    onTimezoneChange,
    onLocaleChange,
    localeOptions,
    timezoneOptions,
  };
};
