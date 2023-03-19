import { AppDispatch } from 'configuration/redux/store';
import { useAuth } from 'modules/auth/hooks';
import { accountQueryAction } from 'modules/company-register/actions';
import { accountRegisterSelector } from 'modules/company-register/selectors/account-register.selector';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CompanyRegisterInterface } from 'views/company-register/utils';

interface UseAccountQueryHookInterface {
  account: CompanyRegisterInterface;
}

export const useAccountQuery = (): UseAccountQueryHookInterface => {
  const { user } = useAuth();
  const { account } = useSelector(accountRegisterSelector);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (user) {
      void dispatch(accountQueryAction(user.id));
    }
  }, [dispatch]);

  return {
    account,
  };
};
