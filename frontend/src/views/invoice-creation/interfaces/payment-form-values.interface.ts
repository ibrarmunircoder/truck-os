
type OrderFile = {
  id: string;
  name: string;
  url: string;
};
export interface PaymentFormValuesInterface {
  id?: string;
  invoiceNumber: string;
  deliveryDate: string | Date;
  invoiceDate: Date;
  applicableLaw: string;
  paymentTerm: string;
  invoiceAmount: string;
  draft?: boolean;
  orderFiles?: OrderFile[];
  __typename?: string;
}
