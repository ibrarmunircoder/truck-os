import { checkVAT, countries } from 'jsvat';
import { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import {
  calculateAgeInYears,
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyDocumentUploadFormModel,
  companyLegalRepresentativeFormModel,
} from 'views/company-register/utils';
import * as Yup from 'yup';

const {
  city,
  address,
  companyName,
  country,
  phoneNumber,
  legalForm,
  postcode,
  registrationCourt,
  registrationNumber,
  addressAddon,
  companyVATID,
} = companyBasicInfoFormModel.formField;
const { companyDocument } = companyDocumentUploadFormModel.formField;
const { companyBIC, companyIBAN, welbingTerms } = companyBankInfoFormModel.formField;
const { isLegalRepresentative, representativePower } = companyLegalRepresentativeFormModel.formField;
const { representatives } = companyAddRepresentativeFormModel.formField;
const { owners } = companyAddOwnerFormModel.formField;

const ONLY_CHARACTERS_GERMAN_REGEX = /^[a-zA-Z\söüäß]+$/;
const ONLY_ALPHABETS_GERMAN_REGEX = /^[a-zA-Z0-9\söüäß]+$/;
// const ONLY_CHARACTERS_REGEX = /^[a-zA-Z\s]+$/;
const ONLY_DIGITS_REGEX = /^[0-9]+$/;
const ONLY_CHARACTERS_COMMA_HYPHEN_REGEX = /^[-a-zA-Z0-9\s,.öüäß]+$/;
const ONLY_ALPHABETS_REGEX = /^[a-zA-Z0-9\s]+$/;
const REGISTRATION_AUTHORITY_REGEX = /^(RA|RADE)[0]{3}[0-9]{1,3}$/;
const REGISTRATION_NUMBER_REGEX = /^(HRA|HRB|GnR|PR|VR)[0-9]{4,6}[A-Z]{0,3}$/;
const REGISTRATION_NUMBER_ERROR_MESSAGE =
  'This should be in the form of HRA162344 or HRB162344 or GnR162344 or PR162344 and VR162344.';
const REGISTRATION_AUTHORITY_ERROR_MESSAGE = 'This should be in the form of RA0001234';
const ONLY_IBAN_REGEX = /^[A-Z0-9_\s]+$/;
const ONLY_IBAN_ERROR_MESSAGE = 'Lowercase Alphabets and Special Characters are not allowed.';
const ONLY_CHARACTERS_ERROR_MESSAGE = 'Numbers and Special Characters are not allowed.';
const ONLY_ALPHABETS_ERROR_MESSAGE = 'Special characters are not allowed.';
const ONLY_CHARACTERS_COMMA_HYPHEN_ERROR_MESSAGE =
  'Numbers and Special Characters are not allowed except comma and hyphen(dashes).';
const ONLY_DIGITS_ERROR_MESSAGE = 'Letters and Special Characters are not allowed.';
// const DATE_FORMAT_REGEX = /(0[1-9]|[12][0-9]|3[01])(\/|\.)(0[1-9]|1[012])(\/|\.)(\d{2,4})/;
// const DATE_FORMAT_ERROR_MESSAGE = 'The following dates format are allowed, DD/MM/YYYY and MM/DD/YY or DD.MM.YY';

const validateIBAN = (value: string) => {
  if (value) {
    return validator.isIBAN(value);
  }
  return false;
};
const validateIBIC = (value: string) => {
  if (value) {
    return validator.isBIC(value);
  }
  return false;
};

const validateAge = (date) => {
  if (date && typeof date === 'string') {
    const yearsOld = calculateAgeInYears(new Date(date));
    if (yearsOld < 18) {
      return false;
    }
    return true;
  }
};

const validateVatNumber = (value: string) => {
  if (value) {
    return checkVAT(value, countries).isValid;
  }
  return false;
};

const validatePhoneNumber = (value: string) => {
  if (value) {
    return isValidPhoneNumber(`+${value}`);
  }
  return false;
};

export const useCompanyRegisterFormSchema = (): Yup.AnyObjectSchema[] => [
  Yup.object().shape({
    [companyName.name]: Yup.string()
      .required('Company Name is required.')
      .matches(ONLY_ALPHABETS_GERMAN_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
    [legalForm.name]: Yup.string().required('Legal Form is required.'),
    [city.name]: Yup.string()
      .required('City is required.')
      .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
    [country.name]: Yup.string()
      .required('Country is required.')
      .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
    [address.name]: Yup.string()
      .required('Address is required.')
      .matches(ONLY_CHARACTERS_COMMA_HYPHEN_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
    [addressAddon.name]: Yup.string().matches(ONLY_CHARACTERS_COMMA_HYPHEN_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
    [phoneNumber.name]: Yup.string()
      .required('Phone Number is required')
      .test('phoneNumber', 'Please enter a valid phone number', validatePhoneNumber),
    [postcode.name]: Yup.string()
      .typeError('Postal Code must be a number')
      .required('Postcode is required.')
      .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
      .min(5, 'Postcode Must ate least 5 characters')
      .matches(ONLY_DIGITS_REGEX, ONLY_DIGITS_ERROR_MESSAGE),
    [registrationCourt.name]: Yup.string()
      .required('Commercial Register Number is required')
      .matches(ONLY_ALPHABETS_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE)
      .matches(REGISTRATION_AUTHORITY_REGEX, REGISTRATION_AUTHORITY_ERROR_MESSAGE),
    [registrationNumber.name]: Yup.string()
      .required('Commercial Register is required')
      .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
      .matches(REGISTRATION_NUMBER_REGEX, REGISTRATION_NUMBER_ERROR_MESSAGE),
    [companyVATID.name]: Yup.string()
      .required('Company VAT ID is required.')
      .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
      .test('vatTest', 'Please provide a valid vat number.', validateVatNumber),
  }),
  Yup.object().shape({
    [companyDocument.name]: Yup.array()
      .of(
        Yup.object({
          id: Yup.string(),
          name: Yup.string(),
        }),
      )
      .min(1),
  }),
  Yup.object().shape({
    [companyIBAN.name]: Yup.string()
      .required('Company IBAN is required.')
      .matches(ONLY_IBAN_REGEX, ONLY_IBAN_ERROR_MESSAGE)
      .test('ibanTest', 'Please provide a valid iban.', validateIBAN),
    [companyBIC.name]: Yup.string()
      .required('Company BIC is required.')
      .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
      .test('bicTest', 'Please provide a valid bic.', validateIBIC),
    [welbingTerms.name]: Yup.bool().required().oneOf([true], 'Accept Welbing Terms and Condition'),
  }),
  Yup.object().shape({
    [isLegalRepresentative.name]: Yup.bool().required(),
    [representativePower.name]: Yup.bool().required(),
  }),
  Yup.object().shape({
    [representatives.name]: Yup.array().of(
      Yup.object({
        [representatives.nestedFields[0].name]: Yup.string()
          .required('First Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [representatives.nestedFields[1].name]: Yup.string()
          .required('Last Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [representatives.nestedFields[2].name]: Yup.string()
          .email('Please enter valid email.')
          .required('Email is required.'),
        [representatives.nestedFields[3].name]: Yup.string()
          .required('Dob is required.')
          .test('AgeTest', 'The age must be greater than 18', validateAge),
        [representatives.nestedFields[4].name]: Yup.string().required('Language is required.'),
        [representatives.nestedFields[5].name]: Yup.string().required().oneOf(Object.values(AccountUserTypeEnum)),
      }),
    ),
  }),
  Yup.object().shape({
    [owners.name]: Yup.array().of(
      Yup.object({
        [owners.nestedFields[0].name]: Yup.string()
          .required('First Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [owners.nestedFields[1].name]: Yup.string()
          .required('Last Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [owners.nestedFields[2].name]: Yup.string()
          .email('Please Provide a valid Email')
          .required('Email is required.'),
        [owners.nestedFields[3].name]: Yup.string()
          .required('Dob is required.')
          .test('AgeTest', 'The age must be greater than 18', validateAge),
        [owners.nestedFields[4].name]: Yup.string().required().oneOf(Object.values(AccountUserTypeEnum)),
        [owners.nestedFields[5].name]: Yup.string()
          .required('Birth place is required.')
          .matches(ONLY_ALPHABETS_GERMAN_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
        [owners.nestedFields[6].name]: Yup.string().required('Nationality is required.'),
        [owners.nestedFields[7].name]: Yup.string()
          .required('Street and Number is required.')
          .matches(ONLY_CHARACTERS_COMMA_HYPHEN_REGEX, ONLY_CHARACTERS_COMMA_HYPHEN_ERROR_MESSAGE),
        [owners.nestedFields[8].name]: Yup.string()
          .required('Postal code is required.')
          .matches(ONLY_DIGITS_REGEX, ONLY_DIGITS_ERROR_MESSAGE),
        [owners.nestedFields[9].name]: Yup.string()
          .required('City is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [owners.nestedFields[10].name]: Yup.string()
          .required('Country is required.')
          .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
        [owners.nestedFields[11].name]: Yup.number()
          .integer()
          .typeError('House number must be a number.')
          .required('House number is required.'),
      }),
    ),
  }),
  Yup.object().shape({}),
  Yup.object().shape({}),
];
