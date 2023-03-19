/* eslint-disable @typescript-eslint/no-explicit-any */
import { Popper } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useFormikContext } from 'formik';
import { useAuth } from 'modules/auth/hooks';
import { AutoCompleteField, InputField } from 'modules/common/components';
import { useCountries, useTranslation } from 'modules/common/hooks';
import { classes as classList } from 'modules/common/utils/classes';
import { useAccountLegalStructure, useAccountRegisterCourts } from 'modules/company-register/hooks';
import React, { FunctionComponent, useEffect, useRef } from 'react';
import PhoneInput from 'react-phone-input-2';
import { useAccountList } from 'views/company-register/hooks';
import { useCompanyBasicInfoStyles } from 'views/company-register/partials/company-basic-info/company-basic-info.styles';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { ICompanyBasicInfoFormModel, isError, isErrorMessage } from 'views/company-register/utils';

interface ICompanyBasicInfoProps {
  formModel: ICompanyBasicInfoFormModel;
}

export const CompanyBasicInfo: FunctionComponent<ICompanyBasicInfoProps> = ({ formModel }): React.ReactElement => {
  const {
    city,
    companyName,
    country,
    legalForm,
    postcode,
    address,
    registrationCourt,
    registrationAuthorityCity,
    registrationNumber,
    addressAddon,
    phoneNumber,
    companyVATID,
  } = formModel.formField;
  const classes = useCompanyBasicInfoStyles();
  const countries = useCountries();
  const { handleFetchAccountLegalStructures, legalStructures } = useAccountLegalStructure();
  const { handleFetchAccountRegisterCourts, registerCourts } = useAccountRegisterCourts();
  const {
    getFieldProps,
    setFieldValue,
    handleBlur,
    values,
    errors,
    touched,
    dirty,
    setFieldError,
    setTouched,
  } = useFormikContext();
  const { handleFetchAccountLists } = useAccountList();
  const { user } = useAuth();

  const { t } = useTranslation();
  const countryState = values[country.name] as string;

  const registrationCourtRef = useRef(null);

  useEffect(() => {
    void Promise.all([handleFetchAccountRegisterCourts(countryState), handleFetchAccountLegalStructures(countryState)]);
  }, [handleFetchAccountLegalStructures, countryState]);

  const handleCountryChange = async (_, value: any) => {
    setFieldValue(country.name, value?.code);
    setFieldValue(legalForm.name, '');
    setFieldValue(registrationCourt.name, '');
    await Promise.all([handleFetchAccountLegalStructures(value?.code), handleFetchAccountRegisterCourts(value?.code)]);
  };

  const registerationAuthorityChange = async (_, value: any) => {
    setFieldValue(registrationCourt.name, value?.registerAuthorityCode);
    setFieldValue(registrationAuthorityCity.name, value?.name);
  };

  const handlePhoneNumberChange = (value) => {
    if (typeof value === 'string' && value) {
      setFieldValue(phoneNumber.name, value);
    }
  };

  useEffect(() => {
    if (dirty && values[registrationNumber.name] && values[registrationCourt.name]) {
      const getAccountLists = async () => {
        const accounts = await handleFetchAccountLists({
          registrationAuthority: { equalTo: values[registrationCourt.name] },
          registrationNumber: { equalTo: values[registrationNumber.name] },
          userId: { notEqualTo: user.id },
        });
        if (accounts.totalCount) {
          setFieldError(registrationNumber.name, 'This registration number already exists');
        }
      };
      void getAccountLists();
    }
  }, [values, dirty, touched]);

  useEffect(() => {
    const legalFormValues = ['DE0001', 'DE0002'];

    if(legalFormValues?.includes(values[legalForm.name])) {
      if(values[registrationCourt.name] !== 'RADE0001') {
        registrationCourtRef?.current?.blur();
        setFieldError(registrationCourt.name, 'For legal structure Einzelunternehmen or GbR only registration authority Gewerbeamt is allowed.');
      }
    }
  }, [values[legalForm.name], values[registrationCourt.name], errors]);  

  return (
    <Box className={classes.companyBasicInfoFormContainer}>
      <Grid container mb={2}>
        <Grid item xs={12}>
          <CompanyHeader title={t('company-register.step1.title')} />
        </Grid>
      </Grid>
      <Grid container className={classes.companyBasicInfoFormRoot} columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <InputField
            fullWidth
            type="text"
            id={companyName.name}
            label={t('company-register.step1.company-name')}
            variant="outlined"
            helperText={isErrorMessage(companyName.name, errors)}
            error={isError(companyName.name, errors, touched)}
            {...getFieldProps(companyName.name)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputField
            fullWidth
            type="text"
            id={postcode.name}
            label={t('company-register.step1.postal-code')}
            variant="outlined"
            helperText={isErrorMessage(postcode.name, errors)}
            error={isError(postcode.name, errors, touched)}
            {...getFieldProps(postcode.name)}
            value={values[postcode.name] || ''}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputField
            fullWidth
            type="text"
            id={address.name}
            label={t('company-register.step1.street-and-number')}
            variant="outlined"
            helperText={isErrorMessage(address.name, errors)}
            error={isError(address.name, errors, touched)}
            {...getFieldProps(address.name)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputField
            fullWidth
            type="text"
            id={addressAddon.name}
            label={t('company-register.step1.address-addon')}
            variant="outlined"
            helperText={isErrorMessage(addressAddon.name, errors)}
            error={isError(addressAddon.name, errors, touched)}
            {...getFieldProps(addressAddon.name)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputField
            fullWidth
            type="text"
            id={city.name}
            label={t('input.city.name')}
            variant="outlined"
            helperText={isErrorMessage(city.name, errors)}
            error={isError(city.name, errors, touched)}
            {...getFieldProps(city.name)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AutoCompleteField
            defaultValue={countries.find((countryObj) => countryObj.code === countryState) || null}
            value={countries.find((countryObj) => countryObj.code === countryState) || null}
            options={countries}
            onChange={handleCountryChange}
            getOptionLabel={(option) => option.label || ''}
            PopperComponent={(props) => (
              <Popper open={true} {...props} style={{ bottom: 0, overflowY: 'auto' }} placement="bottom">
                {props.children}
              </Popper>
            )}
            renderOption={(props, option) => (
              <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
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
              id: country.name,
              label: t('input.country.name'),
              name: country.name,
              variant: 'outlined',
              helperText: isError(country.name, errors, touched) && isErrorMessage(country.name, errors),
              error: isError(country.name, errors, touched),
              fullWidth: true,
              onBlur: handleBlur,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <Box component="div" className={classes.companyBasicInfoMobileWrapper}>
            <PhoneInput
              specialLabel={t('phone-number')}
              country="de"
              enableSearch
              autoFormat={true}
              containerClass={classList(
                classes.companyBasicInfoMobilePhone,
                isError(phoneNumber.name, errors, touched) ? classes.companyBasicInfoPhoneNumberErrorStyles : null,
              )}
              countryCodeEditable={false}
              inputStyle={{
                borderColor: isError(phoneNumber.name, errors, touched) && 'red',
              }}
              {...getFieldProps(phoneNumber.name)}
              onChange={handlePhoneNumberChange}
              onBlur={() =>
                setTouched({
                  ...touched,
                  [phoneNumber.name]: true,
                })
              }
            />
            {isError(phoneNumber.name, errors, touched) && isErrorMessage(phoneNumber.name, errors) && (
              <p className={classes.phoneNumberErrorMessage}>{isErrorMessage(phoneNumber.name, errors)}</p>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={6}>
          <AutoCompleteField
            defaultValue={
              legalStructures.find((legalStructure) => legalStructure.elfCode === values[legalForm.name]) || null
            }
            value={legalStructures.find((legalStructure) => legalStructure.elfCode === values[legalForm.name]) || null}
            options={legalStructures}
            getOptionLabel={(option) => (option ? `${option?.name} (${option?.elfCode})` : '')}
            onChange={(_, value: any) => setFieldValue(legalForm.name, value?.elfCode)}
            textFieldProps={{
              id: legalForm.name,
              label: t('company-register.step1.legal-form'),
              name: legalForm.name,
              variant: 'outlined',
              helperText: isError(legalForm.name, errors, touched) && isErrorMessage(legalForm.name, errors),
              error: isError(legalForm.name, errors, touched),
              fullWidth: true,
              onBlur: handleBlur,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <AutoCompleteField
            defaultValue={
              registerCourts.find(
                (registerCourtOption) => registerCourtOption.registerAuthorityCode === values[registrationCourt.name],
              ) || null
            }
            value={
              registerCourts.find(
                (registerCourtOption) => registerCourtOption.registerAuthorityCode === values[registrationCourt.name],
              ) || null
            }
            options={registerCourts}
            getOptionLabel={(option) => (option ? `${option?.name} (${option?.registerAuthorityCode})` : '')}
            onChange={registerationAuthorityChange}
            textFieldProps={{
              id: registrationCourt.name,
              label: t('company-register.step1.registration-authority'),
              name: registrationCourt.name,
              variant: 'outlined',
              helperText:
                isError(registrationCourt.name, errors, touched) && isErrorMessage(registrationCourt.name, errors),
              error: isError(registrationCourt.name, errors, touched),
              fullWidth: true,
              inputRef: registrationCourtRef,
              onBlur: handleBlur,
            }}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputField
            fullWidth
            type="text"
            id={registrationNumber.name}
            label={t('company-register.step1.registration-number')}
            variant="outlined"
            helperText={
              isError(registrationNumber.name, errors, touched) && isErrorMessage(registrationNumber.name, errors)
            }
            error={isError(registrationNumber.name, errors, touched)}
            {...getFieldProps(registrationNumber.name)}
          />
        </Grid>
        <Grid item xs={12} lg={6}>
          <InputField
            type="text"
            fullWidth
            id={companyVATID.name}
            label={t('company-register.step1.vat-id')}
            variant="outlined"
            helperText={isErrorMessage(companyVATID.name, errors)}
            error={isError(companyVATID.name, errors, touched)}
            {...getFieldProps(companyVATID.name)}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
