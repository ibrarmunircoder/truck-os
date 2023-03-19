/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, Box, Button, createFilterOptions, Grid, Paper, TextField } from '@mui/material';
import { checkVAT, countries as vatCounties } from 'jsvat';
import { AutoCompleteField, InputField } from 'modules/common/components';
import { useCountries, useTranslation } from 'modules/common/hooks';
import { useAccountLegalStructure, useAccountRegisterCourts } from 'modules/company-register/hooks';
import { useDebtorSearch, useFetchPaymentProcesssorDebtors, useFetchSelectedDebtor } from 'modules/debtors/hooks';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { addCustomerDetails, setIsUpdateRepresentative } from 'modules/invoice-creation/invoice-creation.slice';
import {
  formStepSelector,
  invoiceCreationSelector,
  newDebtorEntrySelector,
  stepsVerifiedSelector,
} from 'modules/invoice-creation/selectors';
import { setIsDebtorExist, setIsExternallyVerifiedDebtorFound, setIsNewDebtorEntry } from 'modules/invoice-creation/slices/new-debtor-entry.slice';
import { addDebtorData, setChooseDebtor } from 'modules/selected-debtor/selected-debtor.slice';
import { selectedDebtorSelector } from 'modules/selected-debtor/selectors';
import { postcodeValidator } from 'postcode-validator';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomerFormSchema } from 'views/invoice-creation/hooks';
import { CustomerFormValuesInterface, CustomerRepresentativeInterface } from 'views/invoice-creation/interfaces';
import { useCustomerFormStyles } from 'views/invoice-creation/partials/customer-form/customer-form.styles';

export interface CustomerFormPartialProps {
  onSubmit: (formValues: CustomerFormValuesInterface) => void;
  onValueChange: (formValues: CustomerFormValuesInterface) => void;
  setChangesDetected: (value: boolean) => void;
  isDesktop: boolean;
}

export interface AutoCompleteStringInterface {
  newValue: string;
}

export interface NewValueInterface {
  name: string;
  inputValue: string;
}

export interface AutoCompleteNewValueInterface {
  newValue: NewValueInterface;
}


export const CustomerFormPartial: FunctionComponent<CustomerFormPartialProps> = (props) => {
  const { customerDetails, newRepresentative } = useSelector(invoiceCreationSelector);
  const { doneSteps } = useSelector(formStepSelector);
  const { isNewDebtorEntry, isExternallyVerifiedDebtorFound } = useSelector(newDebtorEntrySelector);
  const dispatch = useDispatch();
  const countries = useCountries();
  const { handleFetchAccountLegalStructures, legalStructures } = useAccountLegalStructure();
  const { handleFetchAccountRegisterCourts, registerCourts } = useAccountRegisterCourts();
  const { isFirstStepVerified } = useSelector(stepsVerifiedSelector);
  const initialValues: CustomerFormValuesInterface = {
    id: '',
    name: '',
    vatNumber: '',
    addressAddon: '',
    commercialRegister: '',
    commercialRegisterNumber: '',
    legalForm: '',
    validated: false,
    debtorReferenceId: null,
    city: '',
    postalCode: '',
    streetAndNumber: '',
    country: '',
    representative: {
      name: '',
      phone: '',
      email: '',
      debtorId: '',
    },
  };
  const { onSubmit, onValueChange, setChangesDetected, isDesktop } = props;
  const classes = useCustomerFormStyles({ isDesktop });
  const { searchDebtors } = useDebtorSearch();
  const { fetchPaymentProcessorDebtors } = useFetchPaymentProcesssorDebtors();
  const filterOption = createFilterOptions();
  const { fetchSelectedDebtor } = useFetchSelectedDebtor();
  const { savedDebtorData } = useSelector(selectedDebtorSelector);

  const {
    handleSubmit,
    handleChange,
    values,
    visibleErrors,
    setFieldValue,
    handleBlur,
    resetForm,
    setTouched,
    errors,
    setFieldTouched
  } = useEnhancedFormik({
    initialValues,
    enableReinitialize: true,
    validateOnMount: true,
    onSubmit,
    validationSchema: useCustomerFormSchema(),
  });

  const [debtorsList, setDebtorsList] = useState([]);
  const [selectedDebtor, setSelecteDebtor] = useState(null);
  const [isNewDebtor, setIsNewDebtor] = useState(false);
  const [isNewRepresentative, setIsNewRepresentative] = useState(false);
  const [debtorValue, setDebtorValue] = useState(null);
  const [representativeValue, setRepresentativeValue] = useState(null);
  const [representatives, setRepresentatives] = useState([]);
  const [inputSearch, setInputSearch] = useState('');
  const [isValidationError, setIsValidationError] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { t } = useTranslation();
  const [isRegistrationNumberExist, setIsRegistrationNumberExist] = useState(false);
  const [isPostalCodeNotValid, setIsPostalCodeNotValid] = useState(false);
  const [isCommercialRegisterNumberNotValid, setIsCommercialRegisterNumberNotValid] = useState(false);
  const [isVatNumberNotValid, setIsVatNumberNotValid] = useState(false);

  useEffect(() => {
    void Promise.all([handleFetchAccountRegisterCourts(values.country), handleFetchAccountLegalStructures(values.country)]);
  }, [handleFetchAccountLegalStructures, values.country]);

  const handleCountryChange = async (_, value: any) => {
    void setTouched({}, false);
    void setFieldValue("country", value?.code);
    void setFieldValue('legalForm', '');
    void setFieldValue('commercialRegister', '');
    await Promise.all([handleFetchAccountLegalStructures(value?.code), handleFetchAccountRegisterCourts(value?.code)]);
  };

  useEffect(() => {
    setIsDropdownOpen(false);
    if (inputSearch.length >= 3) {
      const getSearchDebtors = async () => {
        try {
          const results = await searchDebtors(inputSearch);

          const debtorArray = [];
          results?.debtorSearch?.map((debtor) =>
            debtorArray.push({ ...debtor?.data, referenceId: debtor?.referenceId }),
          );
          setDebtorsList(debtorArray);
          setTimeout(() => {
            setIsDropdownOpen(true);
          }, 500);
        } catch (error) {
          setIsDropdownOpen(true);
        }
      };
      void getSearchDebtors();
    } else {
      void setDebtorsList([]);
      setIsDropdownOpen(false);
    }
  }, [inputSearch]);

  useEffect(() => {
    if (values.commercialRegisterNumber && isNewDebtor && !isExternallyVerifiedDebtorFound) {
      const getPaymentProcessorDebtors = async () => {
        const { getDebtorsDataList } = await fetchPaymentProcessorDebtors();
        const debtorExist = getDebtorsDataList.find(
          (debtor) => debtor.registrationNumber === values.commercialRegisterNumber,
        );
        if (debtorExist) {
          setIsRegistrationNumberExist(true);
        } else {
          setIsRegistrationNumberExist(false);
        }
      };
      void getPaymentProcessorDebtors();
    }
  }, [values.commercialRegisterNumber]);

  useEffect(() => {
    if(!isExternallyVerifiedDebtorFound) {
      if (values.postalCode && values.country) {
        const checkPostalCodeIsValid = async () => {
          if (!postcodeValidator(values?.postalCode, values?.country)) {
            setIsPostalCodeNotValid(true);
          } else {
            setIsPostalCodeNotValid(false);
          }
        };
        void checkPostalCodeIsValid();
      }
      if (values.commercialRegisterNumber && values.country) {
        const checkCommercialRegisterNumberIsValid = async () => {
          if (values.country === "DE") {
            const pattern = /^(HRA|HRB|GnR|PR|VR)[0-9]{4,6}[A-Z]{0,3}$/;
            const result = pattern.test(values.commercialRegisterNumber);
            if(result){
              setIsCommercialRegisterNumberNotValid(false);
            }else{
              setIsCommercialRegisterNumberNotValid(true);
            }
          } else {
            setIsCommercialRegisterNumberNotValid(false);
          }
        };
        void checkCommercialRegisterNumberIsValid();
      }
      if (values.vatNumber && values.country) {
        const checkVatNumberValidation = async () => {
          if (values.country === "DE") {
            if (!checkVAT(values.vatNumber, vatCounties).isValid) {
              setIsVatNumberNotValid(true);
            } else {
              setIsVatNumberNotValid(false);
            }
          } else {
            setIsVatNumberNotValid(false);
          }
        };
        void checkVatNumberValidation();
      }
    }
  }, [values, isExternallyVerifiedDebtorFound]);

  useEffect(() => {
    if (typeof debtorValue === 'string') {
      void setIsNewDebtor(true);
      dispatch(setIsNewDebtorEntry(true));
      void setIsNewRepresentative(true);
      void setFieldValue('name', debtorValue);
    } else if (debtorValue && debtorValue.inputValue) {
      // Create a new value from the user input
      void setIsNewDebtor(true);
      dispatch(setIsNewDebtorEntry(true));
      void setIsNewRepresentative(true);
      void setFieldValue('id', '');
      void setFieldValue('name', debtorValue.inputValue);
      void setFieldValue('vatNumber', '');
      void setFieldValue('addressAddon', '');
      void setFieldValue('legalForm', '');
      void setFieldValue('commercialRegister', '');
      void setFieldValue('commercialRegisterNumber', '');
      void setFieldValue('city', '');
      void setFieldValue('postalCode', '');
      void setFieldValue('streetAndNumber', '');
      void setFieldValue('country', '');
    } else if (debtorValue === null) {
      void setTouched({}, false);
      void resetForm({
        values: initialValues,
      });
      dispatch(setChooseDebtor(null));
      void setSelecteDebtor(null);
      void setIsNewDebtor(false);
      setIsRegistrationNumberExist(false);
      dispatch(setIsNewDebtorEntry(false));
      void setDebtorValue(null);
      void setRepresentatives(null);
      void setRepresentativeValue(null);
      void setIsNewRepresentative(false);
      void setFieldValue('id', '');
      void setFieldValue('name', '');
      void setFieldValue('vatNumber', '');
      void setFieldValue('addressAddon', '');
      void setFieldValue('legalForm', '');
      void setFieldValue('commercialRegister', '');
      void setFieldValue('commercialRegisterNumber', '');
      void setFieldValue('city', '');
      void setFieldValue('postalCode', '');
      void setFieldValue('streetAndNumber', '');
      void setFieldValue('country', '');
      void setFieldValue('representative.name', '');
      void setFieldValue('representative.email', '');
      void setFieldValue('representative.phone', '');
      void setFieldValue('representative.debtorId', '');
    } else {
      void setIsNewDebtor(false);
      setIsRegistrationNumberExist(false);
      dispatch(setIsNewDebtorEntry(false));
      dispatch(
        addCustomerDetails({
          id: debtorValue?.id,
          name: debtorValue?.name,
          vatNumber: debtorValue?.vatNumber,
          addressAddon: debtorValue?.addressAddon,
          commercialRegister: debtorValue?.commercialRegister,
          commercialRegisterNumber: debtorValue.commercialRegisterNumber,
          legalForm: debtorValue?.legalForm,
          validated: false,
          debtorReferenceId: null,
          city: debtorValue?.city,
          postalCode: debtorValue?.postalCode,
          streetAndNumber: debtorValue?.streetAndNumber,
          country: debtorValue?.country,
        }),
      );
      if (selectedDebtor?.debtorRepresentatives?.data.length > 0) {
        const filteredRepresetative = selectedDebtor?.debtorRepresentatives?.data.filter(
          (debtor) => debtor.debtorId === selectedDebtor?.id,
        );
        setRepresentatives(filteredRepresetative);
      }
      dispatch(setChooseDebtor(debtorValue));
      dispatch(addDebtorData(debtorValue));
      void setFieldValue('id', debtorValue?.id);
    }
  }, [debtorValue]);

  useEffect(() => {
    if (typeof representativeValue === 'string' && representativeValue !== '') {
      void setIsNewRepresentative(true);
      void setFieldValue('representative.name', representativeValue);
    } else if (representativeValue && representativeValue?.inputValue) {
      // Create a new value from the user input
      void setIsNewRepresentative(true);
      void setFieldValue('representative.name', representativeValue?.inputValue);
      void setFieldValue('representative.email', '');
      void setFieldValue('representative.phone', '');
      void setFieldValue('representative.debtorId', '');
    } else if (!representativeValue) {
      if (isFirstStepVerified) {
        setTimeout(() => {
          void setIsNewRepresentative(true);
        }, 200);
      } else {
        void setTouched({}, false);
        if (selectedDebtor?.debtorRepresentatives?.data.length > 0) {
          const filteredRepresetative = selectedDebtor?.debtorRepresentatives?.data.filter(
            (debtor) => debtor.debtorId === selectedDebtor?.id,
          );
          setRepresentatives(filteredRepresetative);
        }
        void setIsNewRepresentative(false);
      }
    } else {
      if (isFirstStepVerified) {
        void setIsNewRepresentative(true);
      } else {
        if (selectedDebtor?.debtorRepresentatives?.data.length > 0) {
          const filteredRepresetative = selectedDebtor?.debtorRepresentatives?.data.filter(
            (debtor) => debtor.debtorId === selectedDebtor?.id,
          );
          setRepresentatives(filteredRepresetative);
        }
        void setFieldValue('representative.debtorId', selectedDebtor?.id);
      }
    }
  }, [representativeValue]);

  const onCompanyChange = async (e: React.ChangeEvent<HTMLInputElement>, newValue) => {
    if (typeof newValue === 'string') {
      void setFieldValue('name', newValue);
      void setDebtorValue(newValue);
      setIsDropdownOpen(false);
      dispatch(setIsExternallyVerifiedDebtorFound(false));
      return;
    }
    if (newValue) {
      if (Object.keys(newValue).length > 2) {
        const debtorData = {
          vatNumber: newValue.vatNumber,
          commercialRegister: newValue.registrationAuthorityCode,
          commercialRegisterNumber: newValue.registrationNumber,
        }
        const { findDebtor } = await fetchSelectedDebtor(debtorData);
        if (findDebtor.isInternalDebtorFound) {
          dispatch(setIsDebtorExist(true));
          dispatch(setIsExternallyVerifiedDebtorFound(false));
          getSelecteDebtor(findDebtor, true);
          setIsDropdownOpen(false);
        }
        else {
          dispatch(setIsExternallyVerifiedDebtorFound(true));
          dispatch(setIsDebtorExist(false));
          getSelecteDebtor(newValue, false);
          setIsDropdownOpen(false);
        }
      } else {
        void setFieldValue('name', newValue?.inputValue);
        dispatch(setIsExternallyVerifiedDebtorFound(false));
        void setDebtorValue(newValue);
        setIsDropdownOpen(false);
      }
    } else {
      void setFieldValue('name', newValue?.inputValue || null);
      void setDebtorValue(null);
      void setDebtorsList([]);
      dispatch(setChooseDebtor(null));
      dispatch(addCustomerDetails(null));
      dispatch(setIsExternallyVerifiedDebtorFound(false));
      setIsDropdownOpen(false);
    }
  };

  const getSelecteDebtor = (value, isExist) => {
    if (isExist) {
      void setDebtorValue(value);
      void setSelecteDebtor(value);
      void setRepresentatives(value?.debtorRepresentatives?.data || []);
    }
    else {
      void setDebtorValue({
        id: '',
        name: value?.name,
        vatNumber: value?.vatNumber,
        commercialRegister: value?.registrationAuthorityCode,
        commercialRegisterNumber: value.registrationNumber,
        legalForm: value?.legalForm,
        validated: false,
        debtorReferenceId: value?.referenceId,
        city: value?.address?.city,
        addressAddon: value?.address?.addressAddon,
        postalCode: value?.address?.postCode,
        streetAndNumber: value?.address?.street,
        country: value?.address?.country,
        debtorRepresentatives: {
          data: []
        }
      });
      void setRepresentatives([]);
    }
  };

  const onRepresentativeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    newValue: NewValueInterface | CustomerRepresentativeInterface,
  ) => {
    if (isFirstStepVerified && typeof newValue === 'string') {
      void setFieldTouched('representative.name', true);
      void setFieldValue('representative.name', newValue);
      void setFieldValue('representative.email', '');
      void setFieldValue('representative.phone', '');
      dispatch(
        addCustomerDetails({
          ...values,
          id: customerDetails?.id,
          representative: {
            ...initialValues.representative,
            name: newValue
          },
        }),
      );
    } else if (typeof newValue === 'string') {
      void setFieldTouched('representative.name', true);
      void setRepresentativeValue(newValue);
      void setFieldValue('representative.name', newValue);
      void setFieldValue('representative.email', '');
      void setFieldValue('representative.phone', '');
      dispatch(
        addCustomerDetails({
          ...values,
          id: customerDetails?.id,
          representative: {
            ...initialValues.representative,
            name: newValue
          },
        }),
      );
    } else {
      void setFieldTouched('representative.name', true);
      void setRepresentativeValue(newValue);
      if (!newValue) {
        dispatch(
          addCustomerDetails({
            ...values,
            id: customerDetails.id,
            representative: initialValues?.representative,
          }),
        );
      } else {
        if (!newValue?.inputValue) {
          dispatch(
            addCustomerDetails({
              ...values,
              id: customerDetails.id,
              representative: newValue,
            }),
          );
        }
      }
      void setFieldValue('representative.name', newValue?.inputValue || null);
    }
  };

  const CustomPaper = (paperProps) => <Paper elevation={4} {...paperProps} />;

  useEffect(() => {
    if (errors && Object.keys(errors).length === 0) {
      setIsValidationError(false);
    } else {
      setIsValidationError(true);
    }
    onValueChange(values);
  }, [errors]);

  useEffect(() => {
    setTimeout(() => {
      const formFields = [
        'name',
        'vatNumber',
        'addressAddon',
        'commercialRegister',
        'commercialRegisterNumber',
        'legalForm',
        'city',
        'postalCode',
        'streetAndNumber',
        'country',
      ];
      formFields?.forEach((fieldName) => void setFieldValue(fieldName, customerDetails?.[fieldName] || ''));

      const representativeFields = ['name', 'email', 'phone', 'debtorId'];
      representativeFields?.forEach(
        (representativeField) =>
          void setFieldValue(
            `representative.${representativeField}`,
            customerDetails?.representative?.[representativeField] || '',
          ),
      );

      setRepresentativeValue(customerDetails?.representative);
    }, 200);
    if (!isFirstStepVerified) {
      setChangesDetected(true);
    } else {
      setChangesDetected(false);
    }
  }, [customerDetails]);

  useEffect(() => {
    if (isFirstStepVerified && isNewDebtorEntry && newRepresentative) {
      setTimeout(() => {
        setIsNewDebtor(true);
        setIsNewRepresentative(true);
        dispatch(setIsNewDebtorEntry(true));
      }, 200);
    } else if (isFirstStepVerified && !isNewDebtorEntry) {
      setTimeout(() => {
        setIsNewRepresentative(true);
        dispatch(setIsUpdateRepresentative(true));
      }, 200);
    } else {
      setIsNewRepresentative(false);
    }
    const filteredRepresetative = savedDebtorData?.debtorRepresentatives?.data;
    setRepresentatives(filteredRepresetative);

  }, [isFirstStepVerified, savedDebtorData]);

  return (
    <form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Box className={classes.stepContent}>
            <Grid container columnSpacing={3}>
              <Grid item xs={12} lg={6}>
                <Autocomplete
                  open={isDropdownOpen}
                  value={debtorValue || values?.name}
                  onChange={onCompanyChange}
                  filterOptions={(options, params) => {
                    const filtered = filterOption(options, params);

                    const { inputValue } = params;
                    const isExisting = options.some((option) => inputValue === option.name);
                    if (inputValue !== '' && !isExisting) {
                      filtered.push({
                        inputValue,
                        name: `Add New "${inputValue}"`,
                      });
                    }

                    return filtered;
                  }}
                  PaperComponent={CustomPaper}
                  classes={{ paper: classes.paperBackground }}
                  id="company-name"
                  options={debtorsList}
                  getOptionLabel={(option) => {
                    if (typeof option === 'string') {
                      return option;
                    }

                    if (option.inputValue) {
                      return option.inputValue;
                    }

                    return option.name;
                  }}
                  disabled={doneSteps.includes(0)}
                  renderOption={(dataProps, option) => <li {...dataProps}>{option.name}</li>}
                  freeSolo
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      className={classes.formControl}
                      onChange={(e) => {
                        setInputSearch(e.target.value);
                      }}
                      helperText={visibleErrors.name}
                      error={Boolean(visibleErrors.name)}
                      onBlur={handleBlur}
                      label={t('invoice-creation.customer-name')}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <AutoCompleteField
                  defaultValue={countries.find((countryObj) => countryObj.code === values.country) || values.country}
                  value={countries.find((countryObj) => countryObj.code === values.country) || values.country}
                  disabled={!isNewDebtor}
                  options={countries}
                  onChange={handleCountryChange}
                  PaperComponent={CustomPaper}
                  renderOption={(optionProps, option) => (
                    <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
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
                    id: 'country',
                    label: t('input.country.name'),
                    name: 'country',
                    variant: 'outlined',
                    helperText: visibleErrors.country,
                    error: Boolean(visibleErrors.country),
                    fullWidth: true,
                    onBlur: handleBlur,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <AutoCompleteField
                  defaultValue={
                    legalStructures.find((legalStructure) => legalStructure.elfCode === values.legalForm) || values.legalForm
                  }
                  value={legalStructures.find((legalStructure) => legalStructure.elfCode === values.legalForm) || values.legalForm}
                  disabled={!isNewDebtor}
                  getOptionLabel={(option) => (option ? `${option?.name} (${option?.elfCode})` : '')}
                  options={legalStructures}
                  PaperComponent={CustomPaper}
                  onChange={(_, value: any) => setFieldValue('legalForm', value?.elfCode)}
                  textFieldProps={{
                    id: 'legalForm',
                    label: t('invoice-creation.legal-form'),
                    name: 'legalForm',
                    variant: 'outlined',
                    helperText: visibleErrors.legalForm,
                    error: Boolean(visibleErrors.legalForm),
                    fullWidth: true,
                    onBlur: handleBlur,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <AutoCompleteField
                  defaultValue={
                    registerCourts.find(
                      (registerCourtOption) => registerCourtOption.registerAuthorityCode === values.commercialRegister,
                    ) || values.commercialRegister
                  }
                  value={
                    registerCourts.find(
                      (registerCourtOption) => registerCourtOption.registerAuthorityCode === values.commercialRegister,
                    ) || values.commercialRegister
                  }
                  options={registerCourts}
                  PaperComponent={CustomPaper}
                  disabled={!isNewDebtor}
                  getOptionLabel={(option) => (option ? `${option?.name} (${option?.registerAuthorityCode})` : '')}
                  onChange={(_, value: any) => setFieldValue('commercialRegister', value?.registerAuthorityCode)}
                  textFieldProps={{
                    id: 'commercialRegister',
                    label: t('invoice-creation.commercial-register.label'),
                    name: 'commercialRegister',
                    variant: 'outlined',
                    helperText: visibleErrors.commercialRegister,
                    error: Boolean(visibleErrors.commercialRegister),
                    fullWidth: true,
                    onBlur: handleBlur,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="commercialRegisterNumber"
                  type="text"
                  label={t('invoice-creation.commercial-register-number')}
                  value={values.commercialRegisterNumber}
                  helperText={
                    isNewDebtor && isRegistrationNumberExist
                      ? t('invoice-creation.commercial-register.validation-text') : isCommercialRegisterNumberNotValid ? t('invoice-creation.commercial-register-number-error-text1')
                        : visibleErrors.commercialRegisterNumber
                  }
                  error={isNewDebtor && isRegistrationNumberExist || isCommercialRegisterNumberNotValid ? true : Boolean(visibleErrors.commercialRegisterNumber)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('commercialRegisterNumber', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewDebtor}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="vatNumber"
                  type="text"
                  label={t('invoice-creation.vat-id')}
                  value={values.vatNumber}
                  helperText={isVatNumberNotValid ? t('invoice-creation.vat-number-error-msg1') : visibleErrors.vatNumber}
                  error={isVatNumberNotValid ? true : Boolean(visibleErrors.vatNumber)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('vatNumber', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewDebtor}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="streetAndNumber"
                  type="text"
                  label={t('invoice-creation.street-and-number')}
                  value={values.streetAndNumber}
                  helperText={visibleErrors.streetAndNumber}
                  error={Boolean(visibleErrors.streetAndNumber)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('streetAndNumber', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewDebtor}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="addressAddon"
                  type="text"
                  label={t('invoice-creation.address-addon')}
                  value={values.addressAddon}
                  helperText={visibleErrors.addressAddon}
                  error={Boolean(visibleErrors.addressAddon)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('addressAddon', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewDebtor}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="postalCode"
                  type="text"
                  label={t('invoice-creation.postal-code')}
                  value={values.postalCode}
                  helperText={isPostalCodeNotValid ? t('invoice-creation.postal-code-error-text1') : visibleErrors.postalCode}
                  error={isPostalCodeNotValid ? true : Boolean(visibleErrors.postalCode)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('postalCode', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewDebtor}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="city"
                  type="text"
                  label={t('input.city.name')}
                  value={values.city}
                  helperText={visibleErrors.city}
                  error={Boolean(visibleErrors.city)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('city', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewDebtor}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                {isNewRepresentative && isNewDebtor && !isFirstStepVerified ? (
                  <InputField
                    name="representative.name"
                    type="text"
                    label={t('invoice-creation.representative-name')}
                    value={values?.representative?.name}
                    helperText={visibleErrors?.representative?.name}
                    error={Boolean(visibleErrors?.representative?.name)}
                    fullWidth
                    onChange={handleChange}
                    onReset={() => setFieldValue('representative.name', '')}
                    onBlur={handleBlur}
                    variant="outlined"
                    disabled={!isNewDebtor}
                  />
                ) : (
                  <Autocomplete
                    value={representativeValue}
                    blurOnSelect
                    onChange={onRepresentativeChange}
                    filterOptions={(options, params) => {
                      const filtered = filterOption(options, params);

                      const { inputValue } = params;
                      const isExisting = options.some((option) => inputValue === option.name);
                      if (inputValue !== '' && !isExisting) {
                        filtered.push({
                          inputValue,
                          name: `Add New "${inputValue}"`,
                        });
                      }

                      return filtered;
                    }}
                    PaperComponent={CustomPaper}
                    classes={{ paper: classes.paperBackground }}
                    id="representative-name"
                    options={representatives}
                    getOptionLabel={(option) => {
                      if (typeof option === 'string') {
                        return option;
                      }

                      if (option.inputValue) {
                        return option.inputValue;
                      }

                      return option.name;
                    }}
                    renderOption={(dataProps, option) => <li {...dataProps}>{option.name}</li>}
                    freeSolo
                    disabled={!values.name}
                    onOpen={() => setFieldTouched('representative.name', true)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        className={classes.formControl}
                        label={t('invoice-creation.representative-name')}
                        onChange={handleChange}
                        helperText={visibleErrors?.representative?.name}
                        error={Boolean(visibleErrors?.representative?.name)}
                        onBlur={handleBlur}
                      />
                    )}
                  />
                )}
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="representative.email"
                  type="text"
                  label={t('invoice-creation.representative-email')}
                  value={values?.representative?.email}
                  helperText={visibleErrors?.representative?.email}
                  error={Boolean(visibleErrors?.representative?.email)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('representative.email', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewRepresentative}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <InputField
                  name="representative.phone"
                  type="text"
                  label={t('invoice-creation.representative-phone-number')}
                  value={values?.representative?.phone}
                  helperText={visibleErrors?.representative?.phone}
                  error={Boolean(visibleErrors?.representative?.phone)}
                  fullWidth
                  onChange={handleChange}
                  onReset={() => setFieldValue('representative.phone', '')}
                  onBlur={handleBlur}
                  variant="outlined"
                  disabled={!isNewRepresentative}
                />
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isValidationError || isRegistrationNumberExist || isPostalCodeNotValid || isCommercialRegisterNumberNotValid || isVatNumberNotValid}
            className={classes.stepButton}
          >
            {t('next')}
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};
