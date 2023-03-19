/* eslint-disable @typescript-eslint/no-explicit-any */
import { AppDispatch } from 'configuration/redux/store';
import dayjs from 'dayjs';
import { updateAccountSettingsView } from 'modules/account-settings/account-settings.slice';
import { accountSettingsCurrentViewSelector, settingAccountSelector } from 'modules/account-settings/selectors';
import { useAuth } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { AccountKycStatusEnum } from 'modules/company-register/enum';
import { useCallback, useMemo } from 'react';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes';
import {
  AccountFieldConfigInterface,
  AccountFieldDataInterface,
  AccountFieldMapperInterface,
  AccountInterface,
} from 'views/account-settings/interfaces';
import { AccountUserInterface } from 'views/company-register/interfaces';

interface UseAccountCompanyDetailsHookInterface {
  accountRecord: AccountInterface;
  handleBackButtonClick: () => void;
  accountDataConfig: { [key: string]: AccountFieldConfigInterface };
  transformAccountData: (account: AccountInterface, key: number) => AccountFieldDataInterface[];
  transformAccountUserData: (account: AccountUserInterface, key: number) => AccountFieldDataInterface[];
  kycRedirection: string;
}

export const useAccountCompanyDetails = (): UseAccountCompanyDetailsHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const accountRecord = useSelector(settingAccountSelector);
  const { user } = useAuth();
  const currentSettingsView = useSelector(accountSettingsCurrentViewSelector);
  const { t } = useTranslation();

  const accountDataConfig = useMemo(
    () => ({
      0: {
        '01': {
          getter: (account): string => account.companyName,
          label: t('account-settings.company-details.company-name'),
        },
        '02': {
          getter: (account): string => account.legalForm,
          label: t('account-settings.company-details.legal-form'),
        },
        '03': {
          getter: (account): string =>
            account.streetAndNumber && account.postalCode && account.city && account.country
              ? `${account.streetAndNumber}| ${account.postalCode} ${account.city}| ${account.country}`
              : '',
          label: t('account-settings.company-details.address'),
        },
        '04': {
          getter: (account): string =>
            account.phoneNumber ? formatPhoneNumberIntl(`+${account.phoneNumber}`) : account.phoneNumber,
          label: t('phone-number'),
        },
        '05': {
          getter: (account): string => account.registrationAuthorityCity,
          label: t('account-settings.company-details.registration-authority'),
        },
        '06': {
          getter: (account): string => account.registrationNumber,
          label: t('account-settings.company-details.registration-number'),
        },
      },
      1: {
        '01': { getter: (account): string => account.iban, label: t('account-settings.company-details.iban') },
        '02': { getter: (account): string => account.bic, label: t('account-settings.company-details.bic') },
      },
      2: {
        '01': {
          getter: (account): string => account.companyName,
          label: t('account-settings.company-details.recipient'),
        },
        '02': {
          getter: (account): string => account.virtualDetails.iban,
          label: t('account-settings.company-details.virtualiban'),
        },
        '03': {
          getter: (account): string => account.virtualDetails.bic,
          label: t('account-settings.company-details.virtualbic'),
        },
      },
      3: {
        '01': {
          getter: (account): boolean => account.kycStatus === AccountKycStatusEnum.COMPLETED && user.apiKey,
          label: t('account-settings.company-details.verification-status'),
          href: (account) =>
            account.kycStatus === AccountKycStatusEnum.SUBMITTED && !user.apiKey
              ? routes.accountPending
              : routes.companyRegister,
        },
      },
      4: {
        '01': {
          getter: (accountUser): string =>
            !accountUser.firstName && !accountUser.lastName ? null : `${accountUser.firstName} ${accountUser.lastName}`,
          label: t('account-settings.company-details.name'),
        },
        '02': {
          getter: (accountUser): string => accountUser.email,
          label: t('account-settings.company-details.email'),
        },
        '03': {
          getter: (accountUser): string => dayjs(new Date(accountUser.birthday)).format('DD.MM.YYYY'),
          label: t('account-settings.company-details.birth-date'),
        },
      },
      5: {
        '01': {
          getter: (accountUser): string =>
            !accountUser.firstName && !accountUser.lastName ? null : `${accountUser.firstName} ${accountUser.lastName}`,
          label: t('account-settings.company-details.name'),
        },
        '02': {
          getter: (accountUser): string => accountUser.email,
          label: t('account-settings.company-details.email'),
        },
        '03': {
          getter: (accountUser): string => dayjs(new Date(accountUser.birthday)).format('DD.MM.YYYY'),
          label: t('account-settings.company-details.birth-date'),
        },
      },
    }),
    [user],
  );

  const transformAccountData = useCallback(
    (account: AccountInterface, key: number): AccountFieldDataInterface[] => {
      if (!account) {
        return null;
      }
      return Object.values(accountDataConfig[key])?.reduce(
        (acc: AccountFieldDataInterface[], current: AccountFieldMapperInterface) => {
          acc.push({
            label: current.label,
            value: current.getter(account),
            href: current.href ? current.href(account) : null,
          });
          return acc;
        },
        [],
      ) as AccountFieldDataInterface[];
    },
    [accountDataConfig],
  );

  const transformAccountUserData = useCallback(
    (account: AccountUserInterface, key: number): AccountFieldDataInterface[] => {
      if (!account) {
        return null;
      }
      return Object.values(accountDataConfig[key])?.reduce(
        (acc: AccountFieldDataInterface[], current: AccountFieldMapperInterface) => {
          acc.push({
            label: current.label,
            value: current.getter(account),
          });
          return acc;
        },
        [],
      ) as AccountFieldDataInterface[];
    },
    [accountDataConfig],
  );

  const handleBackButtonClick = useCallback(() => dispatch(updateAccountSettingsView(0)), [currentSettingsView]);

  return {
    accountRecord,
    handleBackButtonClick,
    accountDataConfig,
    transformAccountData,
    transformAccountUserData,
    kycRedirection:
      accountRecord && accountRecord.kycStatus === AccountKycStatusEnum.SUBMITTED && !user.apiKey
        ? routes.accountPending
        : routes.companyRegister,
  };
};
