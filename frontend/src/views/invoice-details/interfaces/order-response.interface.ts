/* eslint-disable @typescript-eslint/no-explicit-any */
import { DebtorInterface, DebtorRepresentativeInterface } from 'modules/debtors/interfaces';
import { DebtorStatusEnum, ReceivableStatusEnum } from 'views/payment-dashboard/enum';

interface OrderFileInterface {
  url: string;
  name: string;
  fileCategory: string;
}

interface DebtorStatusInterface extends DebtorInterface {
  status: DebtorStatusEnum;
}

export interface OrderResponseInterface {
  id?: string;
  invoiceNumber: string;
  deliveryDate: string | Date;
  invoiceDate: Date;
  applicableLaw: string;
  paymentTerm: string;
  invoiceAmount: number;
  receivableAmount: number;
  status: ReceivableStatusEnum;
  orderFiles?: OrderFileInterface[];
  debtor: DebtorStatusInterface;
  debtorRepresentative: DebtorRepresentativeInterface;
}
