import { StoreInterface } from 'configuration/redux/store';
import { AuthStateInterface } from 'modules/auth/auth.slice';
import { createSelector } from 'reselect';

export const authSelector = createSelector<[(state: StoreInterface) => AuthStateInterface], AuthStateInterface>(
  (state) => state.auth,
  (values) => values,
);
