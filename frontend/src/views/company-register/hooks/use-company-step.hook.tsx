import { AppDispatch } from 'configuration/redux/store';
import { FormikHelpers } from 'formik';
import { useTranslation } from 'modules/common/hooks';
import { updateAddStepAction, updateReduceStepAction } from 'modules/company-register/company-register.slice';
import { accountRegisterSelector } from 'modules/company-register/selectors/account-register.selector';
import { useRouter } from 'next/router';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { ALLOWED_TRADE_DOCUMENTS } from 'views/company-register/constants';
import { useAccountUpdate, useKycSubmit } from 'views/company-register/hooks';
import { AccountUserInterface } from 'views/company-register/interfaces';
import { CompanyAccountUserDialog } from 'views/company-register/partials';
import { companyAddRepresentativeFormModel, CompanyRegisterInterface } from 'views/company-register/utils';

interface StepInterface {
  id: number;
  title: string;
  stepTitle: string;
}
interface UseCompanyStep {
  viewActiveStep: number;
  activeStep: number;
  handleBackClick: () => void;
  handleSubmit: (values: CompanyRegisterInterface, actions: FormikHelpers<CompanyRegisterInterface>) => Promise<void>;
  isSubmitButtonDisabled: boolean;
  steps: StepInterface[];
  buttonConfig: { [key: string]: string };
}

const { representatives: representativesField } = companyAddRepresentativeFormModel.formField;

const MySwal = withReactContent(Swal);

export const useCompanyStep = (): UseCompanyStep => {
  const {
    handleBusinessDataUpdate,
    handleCompanyBankInfoUpdate,
    handleCompanyLegalRepresentative,
  } = useAccountUpdate();
  const { handleKycSubmission } = useKycSubmit();
  const { viewActiveStep, activeStep, isSubmitButtonDisabled, account } = useSelector(accountRegisterSelector);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const { t } = useTranslation();

  const handleRepresentativesLimit = () => {
    const representatives = account[representativesField.name] as [];
    const numberOfRepresentatives = representatives.reduce((total: number, representative: AccountUserInterface) => {
      total = representative.id ? ++total : total;
      return total;
    }, 0);

    if (
      (!account.solePower && numberOfRepresentatives > 0 && numberOfRepresentatives < 2) ||
      (!account.solePower && numberOfRepresentatives === 0)
    ) {
      void MySwal.fire({
        html: (
          <CompanyAccountUserDialog
            title={t('company-register.account-user-limit-modal.title')}
            text={t('company-register.account-user-limit-modal.text')}
            btnText={t('company-register.account-user-limit-modal.btn-text')}
            handleDialogClose={() => Swal.close()}
          />
        ),
        customClass: {
          container: 'account-user-sweet-alert',
        },
        showConfirmButton: false,
      });
    } else {
      void dispatch(updateAddStepAction(viewActiveStep + 1));
    }
  };

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

  const buttonConfig = useMemo(
    () => ({
      1: t('company-register.submit.payment-proceed'),
      2: t('company-register.submit.finish-payment'),
      6: t('company-register.submit.text'),
    }),
    [],
  );

  const handleBackClick = useCallback(() => {
    const legalFormValidStep =
      viewActiveStep === 2 ? (ALLOWED_TRADE_DOCUMENTS.includes(account.legalForm as string) ? 1 : 2) : 1;
    void dispatch(updateReduceStepAction(viewActiveStep - legalFormValidStep));
  }, [dispatch, viewActiveStep]);

  const handleSubmit = async (values: CompanyRegisterInterface, actions: FormikHelpers<CompanyRegisterInterface>) => {
    switch (viewActiveStep) {
      case 0:
        handleBusinessDataUpdate({
          accountId: values.id as string,
          companyData: values,
        });
        break;
      case 1:
        void dispatch(updateAddStepAction(viewActiveStep + 1));
        break;
      case 2:
        handleCompanyBankInfoUpdate({
          accountId: values.id as string,
          companyData: values,
        });
        break;
      case 3:
        handleCompanyLegalRepresentative({
          accountId: values.id as string,
          companyData: values,
        });
        break;
      case 4:
        handleRepresentativesLimit();
        break;
      case 5:
        void dispatch(updateAddStepAction(viewActiveStep + 1));
        break;
      case 6:
        handleKycSubmission();
        break;
      case 7:
        void router.replace({
          pathname: routes.paymentDashboard,
        });
        break;
      default:
        // eslint-disable-next-line no-console
        console.log('Do Something Else!');
    }
    actions.setTouched({});
    actions.setSubmitting(false);
  };

  return {
    viewActiveStep,
    activeStep,
    handleBackClick,
    handleSubmit,
    isSubmitButtonDisabled,
    steps,
    buttonConfig,
  };
};
