import { registerEnumType } from '@nestjs/graphql';

export enum AccountSearchKeyEnum {
  COMPANY_NAME = 'companyName',
  LEGAL_FORM = 'legalForm',
  COMPANY_REGISTER_NUMBER = 'companyRegisterNumber',
  CITY = 'city',
  STREET_AND_NUMBER = 'streetAndNumber',
  COUNTRY = 'country',
  IBAN = 'iban',
  BIC = 'bic',
  VAT_ID = 'vatId',
  REGISTRATION_AUTHORITY = 'registrationAuthority',
  REGISTRATION_NUMBER = 'registrationNumber',
}

registerEnumType(AccountSearchKeyEnum, {
  name: 'AccountSearchKeyEnum',
});
