import { registerEnumType } from '@nestjs/graphql';
export enum AccountUserAccountUserTypeEnum {
  ACCOUNT_REPRESENTATIVE = 'accountRepresentative',
  ACCOUNT_BENEFICIAL_OWNER = 'accountBeneficialOwner',
}
registerEnumType(AccountUserAccountUserTypeEnum, {
  name: 'AccountUserAccountUserTypeEnum',
});
