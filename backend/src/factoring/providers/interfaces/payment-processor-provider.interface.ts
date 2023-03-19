import {
  AccountLegalStructure,
  AccountRegisterCourtInterface,
  ReceivableInfoInterface,
  WalbingCreateReceivableBody,
  WalbingDebtorInterface,
  WalbingDocumentUploadInteface,
} from 'src/factoring/interfaces';
import {
  DebtorInfoInterface,
  DebtorInterface,
  DebtorListInterface,
  DebtorStatusPriceInterface,
  PaymentDetailsInterface,
  ReceivableSellingPriceInterface, } from 'src/factoring/providers/interfaces';

export interface PaymentProcessorInterface {
  createNewDebtor(referenceId: string, debtorData: DebtorInterface): Promise<DebtorStatusPriceInterface>;
  receivableSellingPrice(
    referenceId: string,
    invoiceDate: string,
    dueDate: string,
  ): Promise<ReceivableSellingPriceInterface>;
  searchDebtors(searchText: string): Promise<DebtorInfoInterface[]>;
  uploadDocument(
    referenceId: string,
    file: ArrayBuffer,
    fileType: string,
    fileName: string,
  ): Promise<WalbingDocumentUploadInteface>;
  submitReceivableToReview(referenceId: string): Promise<boolean>;
  createReceivable(referenceId: string, body: WalbingCreateReceivableBody): Promise<boolean>;
  getPaymentDetails(): Promise<PaymentDetailsInterface>;
  getDebtorsList(): Promise<DebtorListInterface[]>;
  getReceivableInfo(referenceId: string): Promise<ReceivableInfoInterface>;
  getDebtor(referenceId: string): Promise<WalbingDebtorInterface>;
  getLegalStructures(countryCode: string): Promise<AccountLegalStructure[]>;
  getRegisterCourts(countryCode: string): Promise<AccountRegisterCourtInterface[]>;
}
