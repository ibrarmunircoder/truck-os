import { useTranslation } from 'modules/common/hooks';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import routes from 'routes';

interface StepInterface {
  id: number;
  title: string;
  stepTitle: string;
}

interface UseAccountPendingHookInterface {
  steps: StepInterface[];
  handleBackClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const useAccountPending = (): UseAccountPendingHookInterface => {
  const router = useRouter();
  const { t } = useTranslation();

  const steps = useMemo(
    () => [
      {
        id: 0,
        title: t('company-register.stepper1.subtitle'),
        stepTitle: t('company-register.stepper1.title'),
      },
      {
        id: 1,
        title: t('company-register.stepper2.subtitle'),
        stepTitle: t('company-register.stepper2.title'),
      },
      {
        id: 2,
        title: t('company-register.stepper3.subtitle'),
        stepTitle: t('company-register.stepper3.title'),
      },
      {
        id: 3,
        title: t('company-register.stepper4.subtitle'),
        stepTitle: t('company-register.stepper4.title'),
      },
    ],
    [],
  );

  const handleBackClick = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.stopPropagation();
    void router.replace({
      pathname: routes.paymentDashboard,
    });
  };

  return {
    steps,
    handleBackClick,
  };
};
