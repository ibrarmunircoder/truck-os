import { ReceivableStatusEnum } from 'src/factoring/enums';

interface DebtorContact {
  name: string;
  email: string;
  phone: string;
}

export interface Receivable {
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
}

export interface ReceivableInfoInterface {
  referenceId: string;
  status: ReceivableStatusEnum;
  data: Receivable;
}
