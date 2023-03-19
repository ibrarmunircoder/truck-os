/* eslint-disable @typescript-eslint/no-unused-vars */
import { ComplexError } from 'modules/common/types';
import { useEnhancedFormik, UseEnhancedFormikInterface } from 'modules/forms/hooks';
import { useLocales } from 'modules/locale';
import { LocaleOptionInterface } from 'modules/locale/hooks';
import { useUserUpdate } from 'modules/users/hooks';
import { UserInterface } from 'modules/users/interfaces';
import { resetErrorAction } from 'modules/users/slices';
import { SyntheticEvent, useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { AccountInterface } from 'views/account-settings/interfaces';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { AccountUserInterface } from 'views/company-register/interfaces';
import {
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyLegalRepresentativeFormModel,
} from 'views/company-register/utils';
import { useEditUserFormSchema } from 'views/users/hooks';

export interface EditUserFormValuesInterface {
  firstName: string;
  lastName: string;
  email: string;
  locale?: LocaleOptionInterface | null;
  timezone: string;
  optedInAt?: Date;
  account?: AccountInterface;
  representatives?: AccountUserInterface[];
  owners?: AccountUserInterface[];
}

const {
  city,
  companyName,
  country,
  legalForm,
  postcode,
  address,
  registrationCourt,
  registrationNumber,
  addressAddon,
  companyVATID,
  phoneNumber,
  registrationAuthorityCity,
} = companyBasicInfoFormModel.formField;
// const { companyDocument } = companyDocumentUploadFormModel.formField;
const { companyBIC, companyIBAN } = companyBankInfoFormModel.formField;
const { isLegalRepresentative, representativePower } = companyLegalRepresentativeFormModel.formField;
const { representatives: representativesField } = companyAddRepresentativeFormModel.formField;
const { owners: ownersField } = companyAddOwnerFormModel.formField;

export interface UseEditUserFormInterface extends UseEnhancedFormikInterface<EditUserFormValuesInterface> {
  onLocaleChange: (event: SyntheticEvent, option: LocaleOptionInterface) => void;
  onTimezoneChange: (event: SyntheticEvent, option: string) => void;
  localeOptions: LocaleOptionInterface[];
  updateRequestError: ComplexError | null;
  handleCloseRequestUpdateError: () => void;
}

export const useEditUserForm = (user: UserInterface, onSubmitSuccess: () => void): UseEditUserFormInterface => {
  const { updateUserAndAccount, error: updateRequestError } = useUserUpdate();
  const dispatch = useDispatch();
  const { localeOptions } = useLocales();

  const initialValues = useMemo(
    () => ({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      locale: (Boolean(user.locale) && localeOptions.find((l) => l.id === user.locale)) || null,
      timezone: user.timezone,
      optedInAt: user.optedInAt,
      ...(user.account
        ? {
            account: {
              id: user.account.id,
              [city.name]: user.account[city.name],
              [companyName.name]: user.account[companyName.name],
              [country.name]: user.account[country.name],
              [phoneNumber.name]: user.account[phoneNumber.name],
              [legalForm.name]: user.account[legalForm.name],
              [postcode.name]: user.account[postcode.name],
              [address.name]: user.account[address.name],
              [registrationCourt.name]: user.account[registrationCourt.name],
              [registrationNumber.name]: user.account[registrationNumber.name],
              [addressAddon.name]: user.account[addressAddon.name],
              [companyVATID.name]: user.account[companyVATID.name],
              [companyIBAN.name]: user.account[companyIBAN.name],
              [companyBIC.name]: user.account[companyBIC.name],
              [registrationAuthorityCity.name]: user.account[registrationAuthorityCity.name],
              [isLegalRepresentative.name]: user.account[isLegalRepresentative.name],
              [representativePower.name]: user.account[representativePower.name],
            },
            [representativesField.name]: user.account.accountUsers?.data?.filter(
              (accountUser) => accountUser.accountUserType === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE,
            ),
            [ownersField.name]: user.account.accountUsers?.data?.filter(
              (accountUser) => accountUser.accountUserType === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER,
            ),
          }
        : {}),
    }),
    [user.firstName, user.lastName, user.locale, user.timezone, user.account, user.account.accountUsers],
  );

  const onSubmit = async (formValues: EditUserFormValuesInterface) => {
    const { account, representatives, owners, ...userData } = formValues;
    const { accountFiles, accountUsers, ...accountData } = account;
    const id = await updateUserAndAccount(
      user.id,
      user.account.id,
      {
        ...userData,
        locale: userData.locale?.id,
      },
      {
        ...accountData,
      },
      representatives.concat(owners),
    );
    if (id === user.id) {
      onSubmitSuccess();
    }
  };

  const formik = useEnhancedFormik<EditUserFormValuesInterface>({
    enableReinitialize: true,
    initialValues,
    onSubmit,
    validationSchema: useEditUserFormSchema(user.id),
    // onSubmitSuccess,
  });

  const onLocaleChange = useCallback(
    (_: SyntheticEvent, locale: LocaleOptionInterface) => {
      void formik.setFieldValue('locale', locale);
    },
    [formik.setFieldValue],
  );

  const onTimezoneChange = useCallback(
    (_: SyntheticEvent, timezone: string) => {
      void formik.setFieldValue('timezone', timezone);
    },
    [formik.setFieldValue],
  );

  const handleCloseRequestUpdateError = useCallback(() => {
    dispatch(resetErrorAction());
  }, [dispatch]);

  return {
    localeOptions,
    onLocaleChange,
    onTimezoneChange,
    updateRequestError,
    handleCloseRequestUpdateError,
    ...formik,
  };
};
