import { registerEnumType } from '@nestjs/graphql';

export enum DebtorStatusEnum {
  UNKNOWN = 'UNKNOWN',
  CREATED = 'CREATED',
  IN_REVIEW = 'IN_REVIEW',
  VERIFIED = 'VERIFIED',
  REGISTERED = 'REGISTERED',
  EXPIRED = 'EXPIRED',
  DISABLED = 'DISABLED',
  DISABLED_BY_WALBING = 'DISABLED_BY_WALBING',
}

registerEnumType(DebtorStatusEnum, {
  name: 'DebtorStatusEnum',
});
