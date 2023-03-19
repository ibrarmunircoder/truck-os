import { StoreInterface } from 'configuration/redux/store';
import { CompanyRegisterStateInterface } from 'modules/company-register/company-register.slice';
import { createSelector } from 'reselect';

export const accountRegisterSelector = createSelector<
  [(state: StoreInterface) => CompanyRegisterStateInterface],
  CompanyRegisterStateInterface
>(
  (state) => state.companyRegister,
  (values) => values,
);
