import { registerEnumType } from '@nestjs/graphql';

export enum DebtorOrderSortEnum {
  CREATED_AT = 'createdAt',
  UPDATED_AT = 'updatedAt',
  COMPANY_NAME = 'name',
  VAT_NUMBER = 'vatNumber',
  ADDRESS_ADDON = 'addressAddon',
  COMMERCIAL_REGISTER = 'commercialRegister',
  COMMERCIAL_REGISTER_NUMBER = 'commercialRegisterNumber',
  LEGAL_FORM = 'legalForm',
  VALIDATED = 'validated',
  DEBTOR_REFERENCE_ID = 'debtorReferenceId',
  CITY = 'city',
  POSTAL_CODE = 'postalCode',
  STREET_AND_NUMBER = 'streetAndNumber',
  COUNTRY = 'country',
}

registerEnumType(DebtorOrderSortEnum, {
  name: 'DebtorOrderSortEnum',
});
