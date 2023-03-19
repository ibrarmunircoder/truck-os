import { ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import { paymentUnpaidStatus } from 'views/payment-dashboard/utils';

export const isReceivableUnpaid = (receivableStatus: ReceivableStatusEnum): boolean =>
  receivableStatus ? paymentUnpaidStatus.includes(receivableStatus) : false;
