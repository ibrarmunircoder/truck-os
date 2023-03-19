import { StoreInterface } from 'configuration/redux/store';
import { InvoiceCreationInterface } from 'modules/invoice-creation/invoice-creation.slice';
import { createSelector } from 'reselect';

export const invoiceCreationSelector = createSelector<
  [(state: StoreInterface) => InvoiceCreationInterface],
  InvoiceCreationInterface
>(
  (state) => state.invoiceCreation,
  (values) => values,
);
