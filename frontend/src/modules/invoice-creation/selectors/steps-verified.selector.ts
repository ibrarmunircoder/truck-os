import { StoreInterface } from 'configuration/redux/store';
import { StepsVerifiedStateInterface } from 'modules/invoice-creation/slices/steps-verified.slice';
import { createSelector } from 'reselect';

export const stepsVerifiedSelector = createSelector<
  [(state: StoreInterface) => StepsVerifiedStateInterface],
  StepsVerifiedStateInterface
>(
  (state) => state.stepsVerified,
  (values) => values,
);
