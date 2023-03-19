import { DebtorStatusEnum } from 'views/payment-dashboard/enum';

export const debtorDeniedStatuses = [
  DebtorStatusEnum.EXPIRED,
  DebtorStatusEnum.DISABLED,
  DebtorStatusEnum.DISABLED_BY_WALBING,
];
export const debtorVerifiedStatuses = [DebtorStatusEnum.VERIFIED, DebtorStatusEnum.REGISTERED];
export const debtorVerificationStatuses = [DebtorStatusEnum.CREATED, DebtorStatusEnum.IN_REVIEW];
