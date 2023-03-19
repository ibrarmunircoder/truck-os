import { registerEnumType } from '@nestjs/graphql';

export enum DebtorSearchKeyEnum {
  COMPANY_NAME = 'name',
  VAT_NUMBER = 'vatNumber',
  ADDRESS_ADDON = 'addressAddon',
  COMMERCIAL_REGISTER = 'commercialRegister',
  COMMERCIAL_REGISTER_NUMBER = 'commercialRegisterNumber',
  LEGAL_FORM = 'legalForm',
  DEBTOR_REFERENCE_ID = 'debtorReferenceId',
  CITY = 'city',
  STREET_AND_NUMBER = 'streetAndNumber',
  COUNTRY = 'country',
}

registerEnumType(DebtorSearchKeyEnum, {
  name: 'DebtorSearchKeyEnum',
});
