import { registerEnumType } from '@nestjs/graphql';

export enum AccountOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  COMPANY_NAME = 'companyName',
  LEGAL_FORM = 'legalForm',
  COMPANY_REGISTER_NUMBER = 'companyRegisterNumber',
  CITY = 'city',
  POSTAL_CODE = 'postalCode',
  STREET_AND_NUMBER = 'streetAndNumber',
  COUNTRY = 'country',
  IBAN = 'iban',
  BIC = 'bic',
  VAT_ID = 'vatId',
  REGISTRATION_AUTHORITY = 'registrationAuthority',
  REGISTRATION_NUMBER = 'registrationNumber',
  LEGAL_REPRESENTATIVE = 'legalRepresentative',
  SOLE_POWER = 'solePower',
}

registerEnumType(AccountOrderSortEnum, {
  name: 'AccountOrderSortEnum',
});
