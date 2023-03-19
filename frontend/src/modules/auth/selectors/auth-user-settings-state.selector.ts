import { StoreInterface } from 'configuration/redux/store';
import { AuthStateInterface } from 'modules/auth/auth.slice';
import { SubmitStateInterface } from 'modules/forms/hooks';
import { createSelector } from 'reselect';

export const authUserSettingsStateSelector = createSelector<
  [(state: StoreInterface) => AuthStateInterface],
  SubmitStateInterface | null
>(
  (state) => state.auth,
  (values) => values.userSettingsState,
);
