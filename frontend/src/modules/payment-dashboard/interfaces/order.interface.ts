import { DebtorStatusEnum, ReceivableStatusEnum } from 'views/payment-dashboard/enum';

type Debtor = {
  id: string;
  name: string;
  debtorStatus: DebtorStatusEnum;
  status: DebtorStatusEnum;
};

type DebtorContact = {
  name: string;
  email: string;
  phone: string;
};

export type Receivable = {
  receivableType: string;
  invoiceNumber: string;
  invoiceAmount: number;
  invoiceCurrency: string;
  invoiceDate: string;
  invoiceDueDate: string;
  applicableLaw: string;
  debtorReferenceId: string;
  debtorContact: DebtorContact;
  requestIPU: boolean;
};

type ReceivableInfo = {
  referenceId: string;
  status: ReceivableStatusEnum;
  data: Receivable;
};

type OrderFile = {
  id: string;
  name: string;
  url: string;
};

export type Order = {
  id: string;
  invoiceNumber: string;
  deliveryDate: Date;
  invoiceDate: Date;
  paymentTerm: string;
  invoiceAmount: number;
  receivableAmount: number;
  receivable: ReceivableInfo;
  debtor: Debtor;
  draft: boolean;
  orderFiles: OrderFile[];
  createdAt: string;
  status: ReceivableStatusEnum;
};

export interface OrdersInterface {
  totalCount: number;
  data: Order[];
}
