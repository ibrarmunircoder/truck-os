import {
  DebtorProblemGroup,
  DebtorVerifiedStatus,
  DebtorWaitingGroup,
  ReceivableCompletedGroup,
  ReceivableProblemGroup,
  ReceivableWaitingGroup,
} from 'modules/payment-dashboard/enum';
import { Order } from 'modules/payment-dashboard/interfaces';

interface GroupOrderByOrderDebtorStatusInterface {
  problem: Order[];
  unfinished: Order[];
  waiting: Order[];
  paid: Order[];
}

const enumLookup = (value: number | undefined) => value !== undefined;

const isProblemGroup = (order: Order) =>
  !order.draft &&
  (
    (enumLookup(DebtorProblemGroup[order.debtor?.status]) && !enumLookup(ReceivableCompletedGroup[order?.status]))
    ||
    enumLookup(ReceivableProblemGroup[order?.status])
  );

const isWaitingGroup = (order: Order) =>
  !order.draft &&
  !enumLookup(DebtorProblemGroup[order.debtor?.status]) &&
  (
    enumLookup(DebtorWaitingGroup[order.debtor?.status]) ||
    (enumLookup(DebtorVerifiedStatus[order.debtor?.status]) && enumLookup(ReceivableWaitingGroup[order?.status]))
  );

const isCompletedGroup = (order: Order) =>
  !order.draft &&
  enumLookup(ReceivableCompletedGroup[order?.status]);

export const groupOrderByOrderDebtorStatus = (data: Order[]): GroupOrderByOrderDebtorStatusInterface =>
  data?.reduce(
    (groupOrders: GroupOrderByOrderDebtorStatusInterface, order) => {
      if (isProblemGroup(order)) {
        groupOrders.problem?.push(order);
      }
      if (order.draft) {
        groupOrders.unfinished?.push(order);
      }
      if (isWaitingGroup(order)) {
        groupOrders.waiting?.push(order);
      }
      if (isCompletedGroup(order)) {
        groupOrders.paid?.push(order);
      }
      return groupOrders;
    },
    {
      problem: [],
      unfinished: [],
      waiting: [],
      paid: [],
    },
  );
