import { registerEnumType } from '@nestjs/graphql';

export enum AccountKycStatusEnum {
  OPEN = 'open',
  SUBMITTED = 'submitted',
  POSTIDENT_DONE = 'postident',
  COMPLETED = 'completed',
}

registerEnumType(AccountKycStatusEnum, {
  name: 'AccountKycStatusEnum',
});
