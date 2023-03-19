import { ReceivableStatusEnum } from 'views/payment-dashboard/enum';

export const paymentUnpaidStatus = [ReceivableStatusEnum.UNPAID];

export const paymentPendingStatuses = [
  ReceivableStatusEnum.IN_VERIFICATION,
  ReceivableStatusEnum.READY_FOR_SALE,
  ReceivableStatusEnum.SELLING_SCHEDULED,
  ReceivableStatusEnum.SELLING_IN_PROGRESS,
];
export const paymentCompletedStatuses = [
  ReceivableStatusEnum.IN_SETTLEMENT,
  ReceivableStatusEnum.IN_COLLECTION,
  ReceivableStatusEnum.SETTLED,
];
export const paymentDeniedStatuses = [
  ReceivableStatusEnum.DECLINED,
  ReceivableStatusEnum.SELLING_CANCELED,
  ReceivableStatusEnum.SELLING_ENDED_WITHOUT_BUYER,
  ReceivableStatusEnum.EXPIRED,
  ReceivableStatusEnum.REVOKED,
  ReceivableStatusEnum.NOT_ALLOWED,
];
