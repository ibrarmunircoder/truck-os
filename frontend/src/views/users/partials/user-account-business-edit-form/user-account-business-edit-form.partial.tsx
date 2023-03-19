/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Grid, Popper, TextField, Typography } from '@mui/material';
import { FieldInputProps, FormikErrors, FormikTouched } from 'formik';
import { AutoCompleteField, Dialog, QuestionOption } from 'modules/common/components';
import { Button } from 'modules/common/components/button';
import { ConfirmationModal } from 'modules/common/components/confirmation-modal';
import { useCountries, useTranslation } from 'modules/common/hooks';
import { classes as classList } from 'modules/common/utils/classes';
import { useAccountLegalStructure, useAccountRegisterCourts } from 'modules/company-register/hooks';
import React, { FunctionComponent, useEffect, useState } from 'react';
import InputMask from 'react-input-mask';
import PhoneInput from 'react-phone-input-2';
import {
  OWNER_ACCOUNT_USER_TYPE_FIELD,
  OWNER_BIRTH_PLACE_FIELD,
  OWNER_CITY_FIELD,
  OWNER_COUNTRY_FIELD,
  OWNER_HOUSE_NUMBER_FIELD,
  OWNER_NATIONALITY_FIELD,
  OWNER_POSTAL_CODE_FIELD,
  OWNER_STREET_AND_NUMBER_FIELD,
  REPRESENTATIVE__OWNER_EMAIL_FIELD,
  REPRESENTATIVE_ACCOUNT_USER_TYPE_FIELD,
  REPRESENTATIVE_LANGUAGE_FIELD,
  REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD,
  REPRESENTATIVE_OWNER_FIRST_NAME_FIELD,
  REPRESENTATIVE_OWNER_LAST_NAME_FIELD,
} from 'views/company-register/constants';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import {
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyLegalRepresentativeFormModel,
  isError,
  isErrorMessage,
} from 'views/company-register/utils';
import { EditUserFormValuesInterface } from 'views/users/hooks/use-edit-user-form.hook';
import { UserAccountUserEditForm } from 'views/users/partials';
import { useUserAccountBusinessEditFormStyles } from 'views/users/partials/user-account-business-edit-form/user-account-business-edit-form.styles';
import { useUserEditFormStyles } from 'views/users/partials/user-edit-form/user-edit-form.styles';

interface AccountUpdateValuesInterface {
  solePower?: boolean;
}
interface UserAccountBusinessEditFormProps {
  values: EditUserFormValuesInterface;
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<EditUserFormValuesInterface>>;
  touched: FormikTouched<EditUserFormValuesInterface>;
  errors: FormikErrors<EditUserFormValuesInterface>;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  handleDeleteAccountUser: (id: string) => Promise<void>;
  handleDeleteAccountUserSolePowerChange: (
    accountUserId: string,
    accountId: string,
    account: AccountUpdateValuesInterface,
    callback: () => void,
  ) => Promise<void>;
  setTouched: (
    touched: FormikTouched<EditUserFormValuesInterface>,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<EditUserFormValuesInterface>>;
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
  registrationAuthorityCity,
  companyVATID,
  phoneNumber,
} = companyBasicInfoFormModel.formField;
const { companyBIC, companyIBAN } = companyBankInfoFormModel.formField;

const { representatives } = companyAddRepresentativeFormModel.formField;
const { owners } = companyAddOwnerFormModel.formField;
const { isLegalRepresentative, representativePower } = companyLegalRepresentativeFormModel.formField;

const PlusIcon = () => <img src="/static/icons/plus-icon-v2.svg" alt="Add Button" />;

export const UserAccountBusinessEditForm: FunctionComponent<UserAccountBusinessEditFormProps> = ({
  values,
  getFieldProps,
  setFieldValue,
  errors,
  touched,
  handleBlur,
  handleDeleteAccountUser,
  handleDeleteAccountUserSolePowerChange,
  setTouched,
}) => {
  const classes = useUserEditFormStyles();
  const classes2 = useUserAccountBusinessEditFormStyles();
  const { t } = useTranslation();
  const countries = useCountries();
  const { handleFetchAccountLegalStructures, legalStructures } = useAccountLegalStructure();
  const { handleFetchAccountRegisterCourts, registerCourts } = useAccountRegisterCourts();
  const [isRepresentativePowerModal, setRepresentativePowerModal] = useState(false);
  const [representativeLimitModal, setRepresentativeLimitModal] = useState(false);
  const [deletedRepresentativeId, setDeletedRepresentativeId] = useState('');
  const countryState = values.account[country.name] || 'DE';

  useEffect(() => {
    void Promise.all([handleFetchAccountRegisterCourts(countryState), handleFetchAccountLegalStructures(countryState)]);
  }, [handleFetchAccountLegalStructures, countryState]);

  const handleCountryChange = async (_, value: any) => {
    void setFieldValue(`account.${country.name}`, value?.code);
    void setFieldValue(`account.${legalForm.name}`, '');
    void setFieldValue(`account.${registrationCourt.name}`, '');
    await Promise.all([handleFetchAccountLegalStructures(value?.code), handleFetchAccountRegisterCourts(value?.code)]);
  };

  const registerationAuthorityChange = async (_, value: any) => {
    void setFieldValue(`account.${registrationCourt.name}`, value?.registerAuthorityCode);
    void setFieldValue(`account.${registrationAuthorityCity.name}`, value?.name);
  };

  const handleAddNewRepresentative = () => {
    const representativesValues = [...values[representatives.name]];
    if (values.account[representativePower.name] && representativesValues.length >= 1) {
      return setRepresentativeLimitModal(true);
    }
    if (!values.account[representativePower.name] && representativesValues.length >= 4) {
      return setRepresentativeLimitModal(true);
    }
    void setFieldValue(representatives.name, [
      ...representativesValues,
      {
        [representatives.nestedFields[REPRESENTATIVE_OWNER_FIRST_NAME_FIELD].name]: '',
        [representatives.nestedFields[REPRESENTATIVE_OWNER_LAST_NAME_FIELD].name]: '',
        [representatives.nestedFields[REPRESENTATIVE__OWNER_EMAIL_FIELD].name]: '',
        [representatives.nestedFields[REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD].name]: new Date(0).toUTCString(),
        [representatives.nestedFields[REPRESENTATIVE_LANGUAGE_FIELD].name]: 'en',
        [representatives.nestedFields[REPRESENTATIVE_ACCOUNT_USER_TYPE_FIELD].name]:
          AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE,
        accountId: values.account.id,
      },
    ]);
  };

  const handleAddNewBeneficialOwner = () => {
    const ownersValues = [...values[owners.name]];
    void setFieldValue(owners.name, [
      ...ownersValues,
      {
        [owners.nestedFields[REPRESENTATIVE_OWNER_FIRST_NAME_FIELD].name]: '',
        [owners.nestedFields[REPRESENTATIVE_OWNER_LAST_NAME_FIELD].name]: '',
        [owners.nestedFields[REPRESENTATIVE__OWNER_EMAIL_FIELD].name]: '',
        [owners.nestedFields[REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD].name]: new Date(0).toUTCString(),
        [owners.nestedFields[OWNER_ACCOUNT_USER_TYPE_FIELD].name]: AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER,
        [owners.nestedFields[OWNER_BIRTH_PLACE_FIELD].name]: '',
        [owners.nestedFields[OWNER_NATIONALITY_FIELD].name]: 'DE',
        [owners.nestedFields[OWNER_STREET_AND_NUMBER_FIELD].name]: '',
        [owners.nestedFields[OWNER_POSTAL_CODE_FIELD].name]: '',
        [owners.nestedFields[OWNER_CITY_FIELD].name]: '',
        [owners.nestedFields[OWNER_COUNTRY_FIELD].name]: 'Germany',
        [owners.nestedFields[OWNER_HOUSE_NUMBER_FIELD].name]: null,
        accountId: values.account.id,
      },
    ]);
  };

  const handleDeleteLocalAccountUser = (accountUserType: AccountUserTypeEnum, index: number) => {
    if (accountUserType === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE) {
      const representativesCopy = [...values[representatives.name]];
      representativesCopy.splice(index, 1);
      void setFieldValue(representatives.name, representativesCopy);
    } else {
      const ownersCopy = [...values[owners.name]];
      ownersCopy.splice(index, 1);
      void setFieldValue(owners.name, ownersCopy);
    }
  };

  const handleDisplayAccountUserRepresentativePowerModal = (id: string) => {
    setRepresentativePowerModal(true);
    setDeletedRepresentativeId(id);
  };

  const handleAccountUserRepresentativePower = (id: string) => {
    if (values[representatives.name].length === 2 && values.account[representativePower.name] === false) {
      return handleDisplayAccountUserRepresentativePowerModal(id);
    }
    void handleDeleteAccountUser(id);
  };

  const handleAccountUserCancelClick = () => {
    setRepresentativePowerModal(false);
  };

  const handleAccountUserDeleteConfirmClick = () => {
    if (deletedRepresentativeId) {
      void handleDeleteAccountUserSolePowerChange(
        deletedRepresentativeId,
        values.account.id,
        { solePower: true },
        handleAccountUserCancelClick,
      );
    }
  };

  const handleAddNewAccountUser = (accountUserType: AccountUserTypeEnum) => {
    if (accountUserType === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE) {
      handleAddNewRepresentative();
    } else {
      handleAddNewBeneficialOwner();
    }
  };

  const handlePhoneNumberChange = (value) => {
    if (typeof value === 'string' && value) {
      void setFieldValue(`account.${phoneNumber.name}`, value);
    }
  };

  const handleDialogClose = () => setRepresentativeLimitModal(false);

  const representativePowerModalElement = isRepresentativePowerModal ? (
    <ConfirmationModal
      title="Representative Power Change"
      confirmationMesage="This deletion will make your customer a sole power"
      confirmButtonProps={{
        onClick: handleAccountUserDeleteConfirmClick,
        children: t('delete'),
        className: classes2.confirmButton,
        // disabled: !!isLoading,
      }}
      cancelButtonProps={{
        onClick: handleAccountUserCancelClick,
        children: t('cancel'),
        className: classes2.cancelButton,
      }}
    />
  ) : null;

  const representativeLimitModalElement = representativeLimitModal ? (
    <Dialog title={t('company-register.account-user-limit-modal.title')} onClose={handleDialogClose}>
      <Box display="flex" flexDirection="column">
        <Typography component="h2" className={classes2.dialogContentDescription}>
          {values.account[representativePower.name]
            ? t('company-register.step5.tooltip-text-v2')
            : t('company-register.step5.tooltip-text')}
        </Typography>
        <Button
          className={classes2.confirmButton}
          style={{ alignSelf: 'flex-end' }}
          type="button"
          text={t('cancel')}
          onClick={handleDialogClose}
          variant="contained"
        />
      </Box>
    </Dialog>
  ) : null;

  return (
    <>
      {representativePowerModalElement}
      {representativeLimitModalElement}
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={`account.${companyName.name}`}
          label={t('company-register.step1.company-name')}
          helperText={
            isError(`account.${companyName.name}`, errors, touched) &&
            isErrorMessage(`account.${companyName.name}`, errors)
          }
          error={isError(`account.${companyName.name}`, errors, touched)}
          {...getFieldProps(`account.${companyName.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={`account.${postcode.name}`}
          label={t('company-register.step1.postal-code')}
          helperText={
            isError(`account.${postcode.name}`, errors, touched) && isErrorMessage(`account.${postcode.name}`, errors)
          }
          error={isError(`account.${postcode.name}`, errors, touched)}
          {...getFieldProps(`account.${postcode.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={address.name}
          label={t('company-register.step1.street-and-number')}
          helperText={
            isError(`account.${address.name}`, errors, touched) && isErrorMessage(`account.${address.name}`, errors)
          }
          error={isError(`account.${address.name}`, errors, touched)}
          {...getFieldProps(`account.${address.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={addressAddon.name}
          label={t('company-register.step1.address-addon')}
          helperText={
            isError(`account.${addressAddon.name}`, errors, touched) &&
            isErrorMessage(`account.${addressAddon.name}`, errors)
          }
          error={isError(`account.${addressAddon.name}`, errors, touched)}
          {...getFieldProps(`account.${addressAddon.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6} sx={{ marginTop: '-11px' }}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={`account.${city.name}`}
          label={t('input.city.name')}
          helperText={
            isError(`account.${city.name}`, errors, touched) && isErrorMessage(`account.${city.name}`, errors)
          }
          error={isError(`account.${city.name}`, errors, touched)}
          {...getFieldProps(`account.${city.name}`)}
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <AutoCompleteField
          defaultValue={countries.find((countryObj) => countryObj.code === countryState) || null}
          value={countries.find((countryObj) => countryObj.code === countryState) || null}
          options={countries}
          onChange={handleCountryChange}
          getOptionLabel={(option) => option.label || ''}
          PopperComponent={(propsOptions) => (
            <Popper open={true} {...propsOptions} style={{ bottom: 0, overflowY: 'auto' }} placement="bottom">
              {propsOptions.children}
            </Popper>
          )}
          renderOption={(propsOptions, option) => (
            <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...propsOptions}>
              <img
                loading="lazy"
                width="20"
                src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
                srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
                alt="Country Flag"
              />
              {option.label} ({option.code})
            </Box>
          )}
          textFieldProps={{
            id: `account.${country.name}`,
            label: t('input.country.name'),
            name: `account.${country.name}`,
            helperText:
              isError(`account.${country.name}`, errors, touched) && isErrorMessage(`account.${country.name}`, errors),
            error: isError(`account.${country.name}`, errors, touched),
            fullWidth: true,
            variant: 'standard',
            onBlur: handleBlur,
          }}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <AutoCompleteField
          defaultValue={
            legalStructures.find((legalStructure) => legalStructure.elfCode === values.account[legalForm.name]) || null
          }
          value={
            legalStructures.find((legalStructure) => legalStructure.elfCode === values.account[legalForm.name]) || null
          }
          options={legalStructures}
          getOptionLabel={(option) => (option ? `${option?.name} (${option?.elfCode})` : '')}
          onChange={(_, value: any) => setFieldValue(`account.${legalForm.name}`, value?.elfCode)}
          textFieldProps={{
            id: `account.${legalForm.name}`,
            label: t('company-register.step1.legal-form'),
            name: `account.${legalForm.name}`,
            variant: 'standard',
            helperText:
              isError(`account.${legalForm.name}`, errors, touched) &&
              isErrorMessage(`account.${legalForm.name}`, errors),
            error: isError(`account.${legalForm.name}`, errors, touched),
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <AutoCompleteField
          defaultValue={
            registerCourts.find(
              (registerCourtOption) =>
                registerCourtOption.registerAuthorityCode === values.account[registrationCourt.name],
            ) || null
          }
          value={
            registerCourts.find(
              (registerCourtOption) =>
                registerCourtOption.registerAuthorityCode === values.account[registrationCourt.name],
            ) || null
          }
          options={registerCourts}
          getOptionLabel={(option) => (option ? `${option?.name} (${option?.registerAuthorityCode})` : '')}
          onChange={registerationAuthorityChange}
          textFieldProps={{
            id: `account.${registrationCourt.name}`,
            label: t('company-register.step1.registration-authority'),
            name: `account.${registrationCourt.name}`,
            variant: 'standard',
            helperText:
              isError(`account.${registrationCourt.name}`, errors, touched) &&
              isErrorMessage(`account.${registrationCourt.name}`, errors),
            error: isError(`account.${registrationCourt.name}`, errors, touched),
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={`account.${registrationNumber.name}`}
          label={t('company-register.step1.registration-number')}
          helperText={
            isError(`account.${registrationNumber.name}`, errors, touched) &&
            isErrorMessage(`account.${registrationNumber.name}`, errors)
          }
          error={isError(`account.${registrationNumber.name}`, errors, touched)}
          {...getFieldProps(`account.${registrationNumber.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={`account.${companyVATID.name}`}
          label={t('company-register.step1.vat-id')}
          helperText={
            isError(`account.${companyVATID.name}`, errors, touched) &&
            isErrorMessage(`account.${companyVATID.name}`, errors)
          }
          error={isError(`account.${companyVATID.name}`, errors, touched)}
          {...getFieldProps(`account.${companyVATID.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <InputMask
          mask="**99 9999 9999 9999 9999 99"
          maskPlaceholder=" "
          alwaysShowMask={false}
          {...getFieldProps(`account.${companyIBAN.name}`)}
        >
          {(inputProps) => (
            <TextField
              {...inputProps}
              type="text"
              fullWidth
              classes={classes.textField}
              id={`account.${companyIBAN.name}`}
              label={t('company-register.step3.iban')}
              variant="standard"
              helperText={
                isError(`account.${companyIBAN.name}`, errors, touched) &&
                isErrorMessage(`account.${companyIBAN.name}`, errors)
              }
              error={isError(`account.${companyIBAN.name}`, errors, touched)}
              value={values.account[companyIBAN.name]}
            />
          )}
        </InputMask>
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          classes={classes.textField}
          type="text"
          variant="standard"
          fullWidth
          id={`account.${companyBIC.name}`}
          label={t('company-register.step3.bic')}
          helperText={
            isError(`account.${companyBIC.name}`, errors, touched) &&
            isErrorMessage(`account.${companyBIC.name}`, errors)
          }
          error={isError(`account.${companyBIC.name}`, errors, touched)}
          {...getFieldProps(`account.${companyBIC.name}`)}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <Box component="div" className={classes2.companyBasicInfoMobileWrapper}>
          <PhoneInput
            specialLabel={t('phone-number')}
            country="de"
            enableSearch
            autoFormat={true}
            containerClass={classList(
              classes2.companyBasicInfoMobilePhone,
              isError(`account.${phoneNumber.name}`, errors, touched)
                ? classes2.companyBasicInfoPhoneNumberErrorStyles
                : null,
            )}
            countryCodeEditable={false}
            inputStyle={{
              borderColor: isError(`account.${phoneNumber.name}`, errors, touched) && 'red',
            }}
            {...getFieldProps(`account.${phoneNumber.name}`)}
            onChange={handlePhoneNumberChange}
            onBlur={() =>
              setTouched({
                ...touched,
                account: {
                  ...touched.account,
                  [phoneNumber.name]: true,
                },
              })
            }
          />
          {isError(`account.${phoneNumber.name}`, errors, touched) &&
            isErrorMessage(`account.${phoneNumber.name}`, errors) && (
              <p className={classes2.phoneNumberErrorMessage}>
                {isErrorMessage(`account.${phoneNumber.name}`, errors)}
              </p>
            )}
        </Box>
      </Grid>
      <Grid item sm={12} md={8}>
        <QuestionOption
          {...getFieldProps(`account.${isLegalRepresentative.name}`)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(`account.${isLegalRepresentative.name}`, event.target.value === 'true')
          }
          title={t('company-register.step4.question1.title')}
          description={t('company-register.step4.question1.description')}
          options={[
            { value: true, label: t('company-register.step4.question1.option1') },
            { value: false, label: t('company-register.step4.question1.option2') },
          ]}
        />
      </Grid>
      <Grid item sm={12} md={8}>
        <QuestionOption
          {...getFieldProps(`account.${representativePower.name}`)}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setFieldValue(`account.${representativePower.name}`, event.target.value === 'true')
          }
          style={{ marginTop: '13px' }}
          title={t('company-register.step4.question2.title')}
          description={t('company-register.step4.question2.description')}
          options={[
            { value: true, label: t('company-register.step4.question2.option1') },
            { value: false, label: t('company-register.step4.question2.option2') },
          ]}
        />
      </Grid>
      <Grid item xs={12}>
        {values?.representatives?.map((representative, index) => (
          <UserAccountUserEditForm
            title={`Representative ${index + 1}`}
            key={representative.id}
            type={representative.accountUserType}
            visibleErrors={errors}
            arrayField={representatives}
            getFieldProps={getFieldProps}
            handleBlur={handleBlur}
            index={index}
            touched={touched}
            setFieldValue={setFieldValue}
            handleDeleteAccountUser={() =>
              representative.id
                ? handleAccountUserRepresentativePower(representative.id)
                : handleDeleteLocalAccountUser(AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE, index)
            }
          />
        ))}
      </Grid>
      <Grid item xs={12} md={6}>
        <Button
          // disabled={!solePower && numberOfRepresentatives === 0}
          style={{ height: '37px' }}
          type="button"
          variant="outlined"
          text={t('company-register.step5.account-user.add-btn-text')}
          icon={<PlusIcon />}
          iconPosition="left"
          onClick={() => handleAddNewAccountUser(AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE)}
        />
      </Grid>
      <Grid item xs={12}>
        {values?.owners?.map((owner, index) => (
          <UserAccountUserEditForm
            title={`Beneficial Owner ${index + 1}`}
            key={owner.id}
            type={owner.accountUserType}
            visibleErrors={errors}
            arrayField={owners}
            getFieldProps={getFieldProps}
            handleBlur={handleBlur}
            index={index}
            touched={touched}
            setFieldValue={setFieldValue}
            handleDeleteAccountUser={() =>
              owner.id
                ? handleDeleteAccountUser(owner.id)
                : handleDeleteLocalAccountUser(AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER, index)
            }
          />
        ))}
      </Grid>
      <Grid item xs={12} md={7}>
        <Button
          style={{ height: '37px' }}
          type="button"
          variant="outlined"
          text={t('company-register.step6.account-user.add-btn-text')}
          icon={<PlusIcon />}
          iconPosition="left"
          onClick={() => handleAddNewAccountUser(AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER)}
        />
      </Grid>
    </>
  );
};
