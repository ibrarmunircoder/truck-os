import { ReceivableStatusEnum } from 'views/payment-dashboard/enum';
import { paymentDeniedStatuses } from 'views/payment-dashboard/utils';

export const isReceivableDenied = (receivableStatus: ReceivableStatusEnum): boolean =>
  receivableStatus ? paymentDeniedStatuses.includes(receivableStatus) : false;
