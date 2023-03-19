interface DebtorRepresentative {
  name: string;
  phone: string;
  email: string;
}

export interface WalbingCreateReceivableBody {
  receivableType: string;
  invoiceNumber: string;
  invoiceAmount: number;
  invoiceCurrency: string;
  invoiceDate: string;
  invoiceDueDate: string;
  applicableLaw: string;
  debtorReferenceId: string;
  debtorContact: DebtorRepresentative;
  requestIPU: boolean;
}
