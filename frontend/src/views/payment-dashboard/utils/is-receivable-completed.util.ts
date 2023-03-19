import { ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import { paymentCompletedStatuses } from 'views/payment-dashboard/utils';

export const isReceivableCompleted = (receivableStatus: ReceivableStatusEnum): boolean =>
  receivableStatus ? paymentCompletedStatuses.includes(receivableStatus) : false;
