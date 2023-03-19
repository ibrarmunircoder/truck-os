import { createSlice } from '@reduxjs/toolkit';
import { OrderFileUploadKeysEnum } from 'views/invoice-creation/enum';
import {
  CustomerFormValuesInterface,
  PaymentFormValuesInterface,
  UploadDocumentFormValuesInterface,
} from 'views/invoice-creation/interfaces';

export interface InvoiceCreationInterface {
  customerDetails: CustomerFormValuesInterface;
  paymentDetails: PaymentFormValuesInterface;
  documentDetails: UploadDocumentFormValuesInterface;
  error: null;
  isUpdateRepresentative: boolean;
  newRepresentative: boolean;
}

const initialState: InvoiceCreationInterface = {
  customerDetails: null,
  paymentDetails: null,
  documentDetails: { invoice: null, pod: null },
  error: null,
  isUpdateRepresentative: false,
  newRepresentative: false,
};

export const invoiceCreationSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    addCustomerDetails: (state, action) => {
      state.customerDetails = action.payload;
    },
    addPaymentDetails: (state, action) => {
      state.paymentDetails = action.payload;
    },
    addDocumnentDetails: (state, { payload }) => {
      const { file } = payload;
      const updateField = file.fileCategory === OrderFileUploadKeysEnum.ORDER_FILE_INVOICE_CATEGORY ? 'invoice' : 'pod';
      state.documentDetails[updateField] = file;
    },
    addDocuments: (state, { payload }) => {
      const { files } = payload;
      files?.map((file) => {
        const updateField =
          file.fileCategory === OrderFileUploadKeysEnum.ORDER_FILE_INVOICE_CATEGORY ? 'invoice' : 'pod';
        state.documentDetails[updateField] = file;
      });
    },
    addFileUploadError: (state = initialState, { payload }) => {
      state.error = payload;
    },
    resetError: (state = initialState) => {
      state.error = null;
    },
    clearInvoiceForm: (state) => {
      state.customerDetails = null;
      state.paymentDetails = null;
      state.documentDetails = { invoice: null, pod: null };
      state.error = null;
    },
    updateCustomerDetailsAction: (state, action) => {
      state.customerDetails = action.payload;
    },
    setIsUpdateRepresentative: (state, action) => {
      state.isUpdateRepresentative = action.payload;
    },
    updateIsNewRepresentative: (state, action) => {
      state.newRepresentative = action.payload;
    },
    removeUploadedInvoice: (state) => {
      state.documentDetails = {
        ...state.documentDetails,
        invoice: null,
      };
    },
  },
});

export default invoiceCreationSlice.reducer;

export const {
  addCustomerDetails,
  addFileUploadError,
  addPaymentDetails,
  addDocumnentDetails,
  addDocuments,
  clearInvoiceForm,
  resetError,
  updateCustomerDetailsAction,
  setIsUpdateRepresentative,
  updateIsNewRepresentative,
  removeUploadedInvoice,
} = invoiceCreationSlice.actions;
