import { DebtorStatusEnum } from 'views/payment-dashboard/enum';
import { debtorDeniedStatuses } from 'views/payment-dashboard/utils';

export const isDebtorDenied = (debtorStatus: DebtorStatusEnum): boolean => debtorDeniedStatuses.includes(debtorStatus);
