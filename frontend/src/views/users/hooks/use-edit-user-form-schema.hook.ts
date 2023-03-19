import { checkVAT, countries } from 'jsvat';
import { useTranslation } from 'modules/common/hooks';
import { yup } from 'modules/common/validation';
import { isValidPhoneNumber } from 'react-phone-number-input';
import validator from 'validator';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import {
  calculateAgeInYears,
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyLegalRepresentativeFormModel,
} from 'views/company-register/utils';
import { useAccountList } from 'views/users/hooks';

const {
  city,
  address,
  companyName,
  phoneNumber,
  country,
  legalForm,
  postcode,
  registrationCourt,
  registrationNumber,
  addressAddon,
  companyVATID,
} = companyBasicInfoFormModel.formField;
const { companyBIC, companyIBAN } = companyBankInfoFormModel.formField;
const { isLegalRepresentative, representativePower } = companyLegalRepresentativeFormModel.formField;
const { representatives } = companyAddRepresentativeFormModel.formField;
const { owners } = companyAddOwnerFormModel.formField;

const ONLY_CHARACTERS_GERMAN_REGEX = /^[a-zA-Z\söüäß]+$/;
const ONLY_ALPHABETS_GERMAN_REGEX = /^[a-zA-Z0-9\söüäß]+$/;
// const ONLY_CHARACTERS_REGEX = /^[a-zA-Z\s]+$/;
const ONLY_DIGITS_REGEX = /^[0-9]+$/;
const ONLY_CHARACTERS_COMMA_HYPHEN_REGEX = /^[-a-zA-Z0-9\s,öüäß]+$/;
const ONLY_ALPHABETS_REGEX = /^[a-zA-Z0-9\s]+$/;
const REGISTRATION_AUTHORITY_REGEX = /^RA[0]{3}[0-9]{3}$/;
const REGISTRATION_NUMBER_REGEX = /^(HRA|HRB|GnR|PR|VR)[0-9]{4,6}[A-Z]{0,3}$/;
const REGISTRATION_NUMBER_ERROR_MESSAGE =
  'This should be in the form of HRA162344 or HRB162344 or GnR162344 or PR162344 and VR162344.';
const REGISTRATION_AUTHORITY_ERROR_MESSAGE = 'This should be in the form of RA0001234';
const ONLY_IBAN_REGEX = /^[A-Z0-9_\s]+$/;
const ONLY_IBAN_ERROR_MESSAGE = 'Lowercase Alphabets and Special Characters are not allowed.';
const ONLY_CHARACTERS_ERROR_MESSAGE = 'Numbers and Special Characters are not allowed.';
const ONLY_ALPHABETS_ERROR_MESSAGE = 'Special Characters are not allowed.';
const ONLY_CHARACTERS_COMMA_HYPHEN_ERROR_MESSAGE =
  'Numbers and Special Characters are not allowed except comma and hyphen(dashes).';
const ONLY_DIGITS_ERROR_MESSAGE = 'Letters and Special Characters are not allowed.';

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

export const useEditUserFormSchema = (userId: string): yup.AnyObjectSchema => {
  const { t } = useTranslation();
  const { handleFetchAccountLists } = useAccountList();

  const validationRegisterNumber = async (value, context) => {
    if (value && context?.parent[registrationCourt.name]) {
      const result = await handleFetchAccountLists({
        registrationNumber: { equalTo: value },
        registrationAuthority: { equalTo: context?.parent[registrationCourt.name] },
        userId: { notEqualTo: userId },
      });
      if (result.totalCount) {
        return false;
      }
    }
    return true;
  };

  const validateIBANUniqueness = async (value) => {
    if (value) {
      const accounts = await handleFetchAccountLists({
        iban: { equalTo: value },
        userId: { notEqualTo: userId },
      });
      if (accounts.totalCount) {
        return false;
      }
    }
    return true;
  };

  return yup.object({
    firstName: yup.string().trim().required(t('input.first-name.validation.required')),
    lastName: yup.string().trim().required(t('input.last-name.validation.required')),
    locale: yup.object().required(t('input.locale.validation.required')),
    timezone: yup.string().trim().optional().nullable(),
    account: yup.object().shape({
      userId: yup.string().trim(),
      [companyName.name]: yup
        .string()
        .required('Company Name is required.')
        .matches(ONLY_ALPHABETS_GERMAN_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
      [legalForm.name]: yup.string().required('Legal Form is required.'),
      [city.name]: yup
        .string()
        .required('City is required.')
        .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
      [country.name]: yup
        .string()
        .required('Country is required.')
        .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
      [address.name]: yup
        .string()
        .required('Address is required.')
        .matches(ONLY_CHARACTERS_COMMA_HYPHEN_REGEX, ONLY_CHARACTERS_COMMA_HYPHEN_ERROR_MESSAGE),
      [phoneNumber.name]: yup
        .string()
        .required('Phone Number is required')
        .test('phoneNumber', 'Please enter a valid phone number', validatePhoneNumber),
      [addressAddon.name]: yup
        .string()
        .matches(ONLY_CHARACTERS_COMMA_HYPHEN_REGEX, ONLY_CHARACTERS_COMMA_HYPHEN_ERROR_MESSAGE),
      [postcode.name]: yup
        .string()
        .typeError('Postal Code must be a number')
        .required('Postcode is required.')
        .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
        .min(5, 'Postcode Must ate least 5 characters')
        .matches(ONLY_DIGITS_REGEX, ONLY_DIGITS_ERROR_MESSAGE),
      [registrationCourt.name]: yup
        .string()
        .required('Commercial Register Number is required')
        .matches(ONLY_ALPHABETS_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE)
        .matches(REGISTRATION_AUTHORITY_REGEX, REGISTRATION_AUTHORITY_ERROR_MESSAGE),
      [registrationNumber.name]: yup
        .string()
        .required('Commercial Register is required')
        .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
        .matches(REGISTRATION_NUMBER_REGEX, REGISTRATION_NUMBER_ERROR_MESSAGE)
        .test('uniquer-register-number', 'This registration number already exists!', validationRegisterNumber),
      [companyVATID.name]: yup
        .string()
        .required('Company VAT ID is required.')
        .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
        .test('vatTest', 'Please provide a valid vat number.', validateVatNumber),
      [companyIBAN.name]: yup
        .string()
        .required('Company IBAN is required.')
        .matches(ONLY_IBAN_REGEX, ONLY_IBAN_ERROR_MESSAGE)
        .test('ibanTest', 'Please provide a valid iban.', validateIBAN)
        .test('iban-unique', 'This IBAN already exists', validateIBANUniqueness),
      [companyBIC.name]: yup
        .string()
        .required('Company BIC is required.')
        .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE)
        .test('bicTest', 'Please provide a valid bic.', validateIBIC),
      [isLegalRepresentative.name]: yup.bool().required(),
      [representativePower.name]: yup.bool().required(),
    }),
    [representatives.name]: yup.array().of(
      yup.object({
        [representatives.nestedFields[0].name]: yup
          .string()
          .required('First Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [representatives.nestedFields[1].name]: yup
          .string()
          .required('Last Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [representatives.nestedFields[2].name]: yup
          .string()
          .email('Please enter valid email.')
          .required('Email is required.'),
        [representatives.nestedFields[3].name]: yup
          .string()
          .required('Dob is required.')
          .test('AgeTest', 'The age must be greater than 18', validateAge),
        [representatives.nestedFields[4].name]: yup.string().required('Language is required.'),
        [representatives.nestedFields[5].name]: yup.string().required().oneOf(Object.values(AccountUserTypeEnum)),
      }),
    ),
    [owners.name]: yup.array().of(
      yup.object({
        [owners.nestedFields[0].name]: yup
          .string()
          .required('First Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [owners.nestedFields[1].name]: yup
          .string()
          .required('Last Name is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [owners.nestedFields[2].name]: yup
          .string()
          .email('Please Provide a valid Email')
          .required('Email is required.'),
        [owners.nestedFields[3].name]: yup
          .string()
          .required('Dob is required.')
          .test('AgeTest', 'The age must be greater than 18', validateAge),
        [owners.nestedFields[4].name]: yup.string().required().oneOf(Object.values(AccountUserTypeEnum)),
        [owners.nestedFields[5].name]: yup
          .string()
          .required('Birth place is required.')
          .matches(ONLY_ALPHABETS_GERMAN_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
        [owners.nestedFields[6].name]: yup.string().required('Nationality is required.'),
        [owners.nestedFields[7].name]: yup
          .string()
          .required('Street and Number is required.')
          .matches(ONLY_CHARACTERS_COMMA_HYPHEN_REGEX, ONLY_CHARACTERS_COMMA_HYPHEN_ERROR_MESSAGE),
        [owners.nestedFields[8].name]: yup
          .string()
          .required('Postal code is required.')
          .matches(ONLY_DIGITS_REGEX, ONLY_DIGITS_ERROR_MESSAGE),
        [owners.nestedFields[9].name]: yup
          .string()
          .required('City is required.')
          .matches(ONLY_CHARACTERS_GERMAN_REGEX, ONLY_CHARACTERS_ERROR_MESSAGE),
        [owners.nestedFields[10].name]: yup
          .string()
          .required('Country is required.')
          .matches(ONLY_ALPHABETS_REGEX, ONLY_ALPHABETS_ERROR_MESSAGE),
        [owners.nestedFields[11].name]: yup
          .number()
          .integer()
          .typeError('House number must be a number.')
          .required('House number is required.'),
      }),
    ),
  });
};
