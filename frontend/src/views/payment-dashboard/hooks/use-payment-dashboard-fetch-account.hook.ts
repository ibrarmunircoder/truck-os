import { AppDispatch } from 'configuration/redux/store';
import { useAuth } from 'modules/auth/hooks';
import { paymentDashboardAccountQuery } from 'modules/payment-dashboard/actions';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

interface UsePaymentDashboardFetchAccountHookInterface {
  handleFetchAccount: () => void;
}

export const usePaymentDashboardFetchAccount = (): UsePaymentDashboardFetchAccountHookInterface => {
  const { user } = useAuth();
  const dispatch = useDispatch<AppDispatch>();

  const handleFetchAccount = useCallback(async () => {
    if (user) {
      void dispatch(paymentDashboardAccountQuery(user.id));
    }
  }, [user]);

  return {
    handleFetchAccount,
  };
};
