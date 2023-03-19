import { ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import { paymentPendingStatuses } from 'views/payment-dashboard/utils';

export const isReceivablePending = (receivableStatus: ReceivableStatusEnum): boolean =>
  receivableStatus ? paymentPendingStatuses.includes(receivableStatus) : false;
