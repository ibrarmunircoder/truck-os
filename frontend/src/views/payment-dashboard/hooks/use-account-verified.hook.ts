import { useAuth } from 'modules/auth/hooks';
import { AccountKycStatusEnum } from 'modules/company-register/enum';
import { paymentDashboardAccountSelector } from 'modules/payment-dashboard/selectors/payment-dashboard-account.selector';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import routes from 'routes';

interface UseAccountVerifiedHookInterface {
  isAccountVerified: boolean;
  isShowKycModal: boolean;
  handlePaymentFlowClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  setIsShowKycModal: (data: boolean) => void;
}

export const useAccountVerified = (): UseAccountVerifiedHookInterface => {
  const account = useSelector(paymentDashboardAccountSelector);
  const { user } = useAuth();
  const router = useRouter();

  const [isShowKycModal, setIsShowKycModal] = useState(false);

  const handlePaymentFlowClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {  
    event.stopPropagation();
    if(((account && account.kycStatus === AccountKycStatusEnum.OPEN || !account.vatId) && !user.apiKey)) {
      setIsShowKycModal(true);
      return;
    }

    if (account && account.kycStatus === AccountKycStatusEnum.SUBMITTED && !user.apiKey) {
      return router.push({
        pathname: routes.accountPending,
      });
    }

    void router.push({
      pathname: routes.invoiceCreation,
    });
  };

  return {
    isAccountVerified: user.apiKey,
    isShowKycModal,
    handlePaymentFlowClick,
    setIsShowKycModal
  };
};
