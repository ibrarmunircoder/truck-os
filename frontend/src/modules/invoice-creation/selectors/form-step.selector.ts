import { StoreInterface } from 'configuration/redux/store';
import { FormStepStateInterface } from 'modules/invoice-creation/slices/form-step.slice';
import { createSelector } from 'reselect';

export const formStepSelector = createSelector<
  [(state: StoreInterface) => FormStepStateInterface],
  FormStepStateInterface
>(
  (state) => state.formStep,
  (values) => values,
);
