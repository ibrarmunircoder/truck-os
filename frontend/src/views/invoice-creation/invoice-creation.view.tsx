import { Grid, Typography } from '@mui/material';
import { DashboardLayout } from 'layouts/dashboard/dashboard.layout';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import {
  setAccountId,
  updateCompanyName,
  updateVirtualBic,
  updateVirtualIban,
} from 'modules/account-id/account-id.slice';
import { accountIdSelector } from 'modules/account-id/selectors';
import { withAuth } from 'modules/auth/hocs';
import { useAuth } from 'modules/auth/hooks';
import { ExitPaymentModal } from 'modules/common/components/exit-payment-modal';
import { StepperComponent } from 'modules/common/components/stepper';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { useUpdateDebtorRepresentative } from 'modules/debtor-representatives/hooks';
import { useDebtorUpdate, useFetchDebtor } from 'modules/debtors/hooks';
import { FormAlert } from 'modules/forms/components';
import {
  addCustomerDetails,
  addDocuments,
  addDocumnentDetails,
  addPaymentDetails,
  setIsUpdateRepresentative,
  updateCustomerDetailsAction,
  updateIsNewRepresentative,
} from 'modules/invoice-creation/invoice-creation.slice';
import {
  formStepSelector,
  invoiceCreationSelector,
  newDebtorEntrySelector,
  stepsVerifiedSelector,
} from 'modules/invoice-creation/selectors';
import { virtualIbnSelector } from 'modules/invoice-creation/selectors/virtual-ibn.selector';
import { setActiveStepAction, setDoneStepAction } from 'modules/invoice-creation/slices/form-step.slice';
import { setIsNewDebtorEntry } from 'modules/invoice-creation/slices/new-debtor-entry.slice';
import { setFirstStepVerified, setSecondStepVerified } from 'modules/invoice-creation/slices/steps-verified.slice';
import { setVirtualIbn } from 'modules/invoice-creation/slices/virtual-ibn.slice';
import { useFetchOrders } from 'modules/orders/hooks';
import { getAllOrders } from 'modules/orders/order.slice';
import {
  addDebtorData,
  addDebtorRepresentativeData,
  updateDebtorData,
  updateRepresentativeData,
} from 'modules/selected-debtor/selected-debtor.slice';
import { selectedDebtorSelector } from 'modules/selected-debtor/selectors';
import { ReactElement, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import routes from 'routes';
import { useAccountQuery } from 'views/company-register/hooks';
import {
  useCustomerCreate,
  useDebtorRepresentativeCreate,
  useFetchOrder,
  useGetAccountDetails,
  useOrderCreate,
  useUpdateOrder,
  useUpdateOrderRepresentative,
} from 'views/invoice-creation/hooks';
import {
  CustomerFormValuesInterface,
  PaymentFormValuesInterface,
  UploadDocumentFormValuesInterface,
} from 'views/invoice-creation/interfaces';
import {
  CustomerFormPartial,
  DebtorModalPartial,
  PaymentFormPartial,
  StepHeaderPartial,
  UploadDocumentFormPartial,
} from 'views/invoice-creation/partials';
export const InvoiceCreationView = withAuth()(
  (): ReactElement => {
    const isDesktop = useMatchMediaQuery();
    const [activeStep, setActiveStep] = useState(0);
    const [apiStatus, setApiStatus] = useState({
      isError: false,
      message: '',
    });
    const { customerDetails, paymentDetails, isUpdateRepresentative } = useSelector(invoiceCreationSelector);
    const { selectedDebtorData, savedDebtorData } = useSelector(selectedDebtorSelector);
    const { isNewDebtorEntry, isDebtorExist } = useSelector(newDebtorEntrySelector);
    const { isFirstStepVerified, isSecondStepVerified } = useSelector(stepsVerifiedSelector);
    const { virtualIBN } = useSelector(virtualIbnSelector);
    const { isUnfinishedRequest } = useSelector(formStepSelector);
    const { account } = useAccountQuery();
    const { handleGetAccountDetails } = useGetAccountDetails();
    const { user } = useAuth();

    const { handleFetchOrder } = useFetchOrder();

    useEffect(() => {
      const loadAccountDetails = async () => {
        const { accounts } = await handleGetAccountDetails(user.id);
        dispatch(setAccountId(accounts.data[0].id));
        dispatch(updateVirtualIban(accounts.data[0].virtualDetails.iban));
        dispatch(updateVirtualBic(accounts.data[0].virtualDetails.bic));
        dispatch(updateCompanyName(accounts.data[0].companyName));
      };
      void loadAccountDetails();
    }, [account]);
    const { accountId } = useSelector(accountIdSelector);
    const [stepForm, setStepForm] = useState({
      customerAllData: {},
      customerData: {
        name: '',
        vatNumber: '',
        addressAddon: '',
        commercialRegister: '',
        commercialRegisterNumber: '',
        legalForm: '',
        validated: false,
        debtorReferenceId: null,
        accountId,
        city: '',
        postalCode: null,
        streetAndNumber: '',
        country: '',
      },
      debtorRepresentative: {},
      paymentData: {},
      documentData: {},
    });
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isExitModalOpen, setIsExitModalOpen] = useState(false);
    const [changesDetected, setChangesDetected] = useState(false);
    const router = useRouter();
    const { step, orderId } = router.query;
    const dispatch = useDispatch();
    const { handleCustomerCreate } = useCustomerCreate();
    const { handleOrderCreate } = useOrderCreate();
    const { handleUpdateDebtor } = useDebtorUpdate();
    const { handleDebtorRepresentativeCreate } = useDebtorRepresentativeCreate();
    const { t } = useTranslation();
    const { handleUpdateOrder } = useUpdateOrder();
    const { handleUpdateOrderRepresentative } = useUpdateOrderRepresentative();
    const { handleUpdateDebtorRepresentative } = useUpdateDebtorRepresentative();
    const steps = [
      {
        id: 0,
        title: t('invoice-creation.stepper1.title'),
        stepTitle: t('invoice-creation.stepper1.steptitle'),
      },
      {
        id: 1,
        title: t('invoice-creation.stepper2.title'),
        stepTitle: t('invoice-creation.stepper2.steptitle'),
      },
      {
        id: 2,
        title: !virtualIBN ? t('invoice-creation.stepper3.title-v1') : t('invoice-creation.stepper3.title-v2'),
        stepTitle: t('invoice-creation.stepper3.steptitle'),
      },
    ];
    const { fetchOrders } = useFetchOrders();
    const { fetchSingleDebtor } = useFetchDebtor();
    const loadOrders = async () => {
      const results = await fetchOrders(accountId);
      const ordersData = results?.orders;
      dispatch(getAllOrders(ordersData));
    };
    useEffect(() => {
      if (activeStep === 0 && accountId) {
        void loadOrders();
      }
    }, [activeStep, accountId]);

    useEffect(() => {
      const fetchOrderDetails = async () => {
        try {
          if (step && orderId) {
            setActiveStep(+step);
            const order = await handleFetchOrder(orderId as string);
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { debtor, debtorRepresentative, orderFiles, ...orderDetails } = order;

            dispatch(addPaymentDetails({ ...orderDetails }));
            dispatch(addDocuments({ files: order.orderFiles }));
            const getDebtorData = await fetchSingleDebtor(debtor?.id);
            dispatch(addDebtorData(getDebtorData.debtor));

            const debtorDetails = {
              ...debtor,
              representative: debtorRepresentative,
            };
            dispatch(addCustomerDetails(debtorDetails));
            if (step === '1' || step === '0') {
              dispatch(setFirstStepVerified(true));
              dispatch(setDoneStepAction(+step));
            }
            if (step === '2') {
              dispatch(setFirstStepVerified(true));
              dispatch(setSecondStepVerified(true));
            }
          }
        } catch (error) {
          console.error(error);
          setApiStatus({
            isError: true,
            message: error.toString(),
          });
          setTimeout(() => router.push({ route: routes.paymentDashboard }), 3000);
        }
      };
      void fetchOrderDetails();
    }, [step, orderId]);

    const handleExit = () => {
      setIsExitModalOpen(true);
      // if (changesDetected) {
      //   setIsExitModalOpen(true);
      // } else {
      //   void router.push({ route: routes.paymentDashboard });
      // }
    };

    const handleBack = () => {
      if (step === '0' || !step && !orderId) {
        if (changesDetected && !isFirstStepVerified) {
          setIsExitModalOpen(true);
        } else {
          void router.push({ route: routes.paymentDashboard });
        }
      } else if (virtualIBN && step === '2') {
        dispatch(setVirtualIbn(false));
      } else {
        if (activeStep > 0) {
          void router.push({
            pathname: routes.invoiceCreation,
            search: `?step=${activeStep - 1}&orderId=${orderId}`,
          });
          setActiveStep(activeStep - 1);
          dispatch(setDoneStepAction(activeStep - 1));
        }
      }
    };
    const handleNext = (orderDataId: string) => {
      if (activeStep < steps.length) {
        setActiveStep(activeStep + 1);
        dispatch(setActiveStepAction(activeStep + 1));
        dispatch(setDoneStepAction(activeStep));
        setChangesDetected(false);
        handleInvoiceFlowSteps(orderDataId);
      }
    };

    const handleExitAction = async () => {
      try {
        void router.push({ route: routes.paymentDashboard });
      } catch (error) {
        setApiStatus({
          isError: true,
          message: error.toString(),
        });
      }
    };

    const resetError = () => {
      setApiStatus({
        isError: false,
        message: '',
      });
    };

    useEffect(() => {
      if (isUnfinishedRequest) {
        if (step) {
          dispatch(setActiveStepAction(step));
          dispatch(setVirtualIbn(true));
          setActiveStep(+step);
          dispatch(setFirstStepVerified(true));
          dispatch(setSecondStepVerified(true));
          return;
        }
      }

      dispatch(setActiveStepAction(activeStep));
    }, [activeStep]);

    const handleInvoiceFlowSteps = (createOrderId: string) => {
      void router.push({
        pathname: routes.invoiceCreation,
        search: `?step=${activeStep + 1}&orderId=${createOrderId}`,
      });
    };

    const handleNewCustomer = async () => {
      setIsOpenModal(false);
      const newDebtorData = await handleCustomerCreate(stepForm.customerData);
      const debtorId = newDebtorData?.createDebtor.id;

      const representativeValues = {
        ...stepForm.debtorRepresentative,
        debtorId,
      };
      const { createDebtorRepresentative } = await handleDebtorRepresentativeCreate(representativeValues);
      const debtorCreatedData = {
        ...newDebtorData?.createDebtor,
        debtorRepresentatives: {
          data: [createDebtorRepresentative],
        },
      };
      dispatch(addDebtorData(debtorCreatedData));
      dispatch(setIsNewDebtorEntry(true));
      dispatch(
        addCustomerDetails({
          ...stepForm.customerAllData,
          id: debtorId,
          representative: createDebtorRepresentative,
        }),
      );
      const orderResult = await handleOrderCreate({
        accountId,
        draft: true,
        debtorId,
        debtorRepresentativeId: createDebtorRepresentative.id,
        applicableLaw: stepForm.customerData?.country ?? 'DE',
        priority: 1,
      });
      dispatch(addPaymentDetails(orderResult.createOrder));
      handleNext(orderResult.createOrder.id);
      dispatch(setFirstStepVerified(true));
      dispatch(updateIsNewRepresentative(true));
    };

    const customerValuesCallback = (values: CustomerFormValuesInterface) => {
      if (
        values?.name !== '' ||
        values?.legalForm !== '' ||
        values?.vatNumber !== '' ||
        values?.commercialRegister !== '' ||
        values?.commercialRegisterNumber !== '' ||
        values?.streetAndNumber !== '' ||
        values?.addressAddon !== '' ||
        values?.postalCode !== '' ||
        values?.postalCode !== '' ||
        values?.city !== '' ||
        values?.country !== '' ||
        values?.representative?.name !== '' ||
        values?.representative?.email !== '' ||
        values?.representative?.phone !== ''
      ) {
        if (!isFirstStepVerified) {
          setChangesDetected(true);
        }
      } else {
        setChangesDetected(false);
      }
    };

    const paymentValuesCallback = (values: PaymentFormValuesInterface) => {
      if (
        values?.invoiceNumber !== '' ||
        values?.invoiceDate !== null ||
        values?.applicableLaw !== '' ||
        values?.paymentTerm !== ''
      ) {
        if (!isSecondStepVerified) {
          setChangesDetected(true);
        }
      } else {
        setChangesDetected(false);
      }
    };

    const createNewrepresentative = async (represetativeData, values) => {
      const newRepresentativeValues = {
        ...represetativeData,
        debtorId: customerDetails?.id,
      };

      const { createDebtorRepresentative } = await handleDebtorRepresentativeCreate(newRepresentativeValues);
      dispatch(addDebtorRepresentativeData(createDebtorRepresentative));
      dispatch(
        addCustomerDetails({
          ...values,
          id: customerDetails?.id,
          representative: createDebtorRepresentative,
        }),
      );
      const { updateOrderRepresentative } = await handleUpdateOrderRepresentative(
        paymentDetails.id,
        createDebtorRepresentative.id,
      );
      dispatch(addPaymentDetails(updateOrderRepresentative));
    };

    const handleCustomerFormSubmit = async (formData: CustomerFormValuesInterface) => {
      const debtorData = {
        name: formData.name,
        vatNumber: formData.vatNumber,
        addressAddon: formData.addressAddon,
        commercialRegister: formData.commercialRegister,
        commercialRegisterNumber: formData.commercialRegisterNumber,
        legalForm: formData.legalForm,
        validated: formData.validated,
        debtorReferenceId: null,
        accountId,
        city: formData.city,
        postalCode: formData.postalCode,
        streetAndNumber: formData.streetAndNumber,
        country: formData.country,
      };
      const represetativeData = {
        name: formData.representative.name,
        phone: formData.representative.phone,
        email: formData.representative.email,
        debtorId: '',
      };
      // debtor exist
      if (selectedDebtorData) {
        if (isDebtorExist) {
          // representative exist in debtor
          if (savedDebtorData?.debtorRepresentatives?.data.length > 0) {
            const isDebtorRepresentativeExist = savedDebtorData?.debtorRepresentatives?.data.find(
              (debtorRepresentative) => debtorRepresentative.id === customerDetails.representative?.id,
            );

            // is represetative exist
            if (isDebtorRepresentativeExist && formData?.representative?.name === isDebtorRepresentativeExist?.name) {
              const orderResult = await handleOrderCreate({
                accountId,
                draft: true,
                priority: 1,
                debtorId: savedDebtorData.id,
                debtorRepresentativeId: isDebtorRepresentativeExist?.id,
                applicableLaw: savedDebtorData.country || 'DE',
              });
              dispatch(addPaymentDetails(orderResult.createOrder));
              handleNext(orderResult.createOrder.id);
              dispatch(setFirstStepVerified(true));
            } else {
              const newRepresentativeValues = {
                ...represetativeData,
                debtorId: customerDetails?.id,
              };
              const { createDebtorRepresentative } = await handleDebtorRepresentativeCreate(newRepresentativeValues);
              dispatch(addDebtorRepresentativeData(createDebtorRepresentative));
              dispatch(
                addCustomerDetails({
                  ...customerDetails,
                  representative: createDebtorRepresentative,
                }),
              );
              const orderResult = await handleOrderCreate({
                accountId,
                draft: true,
                priority: 1,
                debtorId: savedDebtorData.id,
                debtorRepresentativeId: createDebtorRepresentative?.id,
                applicableLaw: savedDebtorData.country || 'DE',
              });
              dispatch(addPaymentDetails(orderResult.createOrder));
              handleNext(orderResult.createOrder.id);
              dispatch(setFirstStepVerified(true));
            }
          } else {
            const fetchAddedDebtorData = {
              ...debtorData,
              debtorReferenceId: customerDetails?.debtorReferenceId,
            };
            void createNewrepresentative(represetativeData, fetchAddedDebtorData);
            handleNext(paymentDetails.id);
            dispatch(setFirstStepVerified(true));
          }
        }
        // debtor is not exist in our database
        else {
          const debtorInputsData = {
            ...debtorData,
          };

          const newDebtorData = await handleCustomerCreate(debtorInputsData);
          const debtorId = newDebtorData?.createDebtor.id;

          const representativeValues = {
            ...represetativeData,
            debtorId,
          };

          const { createDebtorRepresentative } = await handleDebtorRepresentativeCreate(representativeValues);
          const debtorCreatedData = {
            ...newDebtorData?.createDebtor,
            debtorRepresentatives: {
              data: [createDebtorRepresentative],
            },
          };
          dispatch(addDebtorData(debtorCreatedData));
          dispatch(
            addCustomerDetails({
              ...formData,
              id: debtorId,
              representative: createDebtorRepresentative,
            }),
          );

          const orderResult = await handleOrderCreate({
            accountId,
            draft: true,
            priority: 1,
            debtorId,
            debtorRepresentativeId: createDebtorRepresentative.id,
            applicableLaw: debtorData.country || 'DE',
          });
          dispatch(addPaymentDetails(orderResult.createOrder));
          handleNext(orderResult.createOrder.id);
          dispatch(setFirstStepVerified(true));
          dispatch(updateIsNewRepresentative(true));
        }
      } else if (customerDetails) {
        // on editing : if debtor is new in truckos
        if (isNewDebtorEntry && isFirstStepVerified) {
          const fetchAddedDebtorData = {
            ...debtorData,
            debtorReferenceId: customerDetails?.debtorReferenceId,
          };
          const { updateDebtor } = await handleUpdateDebtor(customerDetails?.id, fetchAddedDebtorData);
          dispatch(updateDebtorData(updateDebtor));
          // if debtor representative's name change create new representative
          if (
            !customerDetails?.representative?.debtorId ||
            customerDetails?.representative?.name !== represetativeData.name
          ) {
            void createNewrepresentative(represetativeData, fetchAddedDebtorData);
          }
          // if debtor representative's email and phone change update representative
          else {
            const updateDebtorRepresentativeData = {
              ...represetativeData,
              debtorId: customerDetails?.id,
            };
            const { updateDebtorRepresentative } = await handleUpdateDebtorRepresentative(
              customerDetails?.representative?.id,
              updateDebtorRepresentativeData,
            );
            dispatch(updateRepresentativeData(updateDebtorRepresentative));
            dispatch(
              addCustomerDetails({
                ...customerDetails,
                ...updateDebtor,
                postalCode: updateDebtor?.postalCode,
                representative: updateDebtorRepresentative,
              }),
            );
            const { updateOrderRepresentative } = await handleUpdateOrderRepresentative(
              paymentDetails.id,
              updateDebtorRepresentative.id,
            );
            dispatch(addPaymentDetails(updateOrderRepresentative));
          }
        }
        // on editing : if debtor representative is exist in truckos
        if (isUpdateRepresentative && isFirstStepVerified) {
          // if debtor representative's name change create new representative
          if (
            !customerDetails?.representative?.debtorId ||
            customerDetails?.representative?.name !== represetativeData.name
          ) {
            const fetchAddedDebtorData = {
              ...debtorData,
              debtorReferenceId: customerDetails?.debtorReferenceId,
            };
            void createNewrepresentative(represetativeData, fetchAddedDebtorData);
          }
          // if debtor representative's email and phone change update representative
          else {
            const updateDebtorRepresentativeData = {
              ...represetativeData,
              debtorId: customerDetails?.id,
            };
            const { updateDebtorRepresentative } = await handleUpdateDebtorRepresentative(
              customerDetails?.representative?.id,
              updateDebtorRepresentativeData,
            );
            dispatch(updateRepresentativeData(updateDebtorRepresentative));
            dispatch(
              addCustomerDetails({
                ...customerDetails,
                representative: updateDebtorRepresentative,
              }),
            );
            const { updateOrderRepresentative } = await handleUpdateOrderRepresentative(
              paymentDetails.id,
              updateDebtorRepresentative.id,
            );
            dispatch(addPaymentDetails(updateOrderRepresentative));
            dispatch(setIsUpdateRepresentative(false));
          }
        }
        handleNext(paymentDetails.id);
        dispatch(setFirstStepVerified(true));
      } else {
        setIsOpenModal(true);
        setStepForm({
          ...stepForm,
          customerAllData: formData,
          customerData: debtorData,
          debtorRepresentative: represetativeData,
        });
      }
    };

    const handlePaymentFormSubmit = async (payFormData: PaymentFormValuesInterface) => {
      const paymentUpdateInfoData = {
        ...payFormData,
        invoiceAmount: parseFloat(payFormData?.invoiceAmount),
        debtorId: customerDetails?.id,
        debtorRepresentativeId: customerDetails?.representative?.id,
        // draft: false,
      };
      try {
        const updatedOrderResult = await handleUpdateOrder(paymentDetails.id, paymentUpdateInfoData);
        dispatch(addPaymentDetails(updatedOrderResult));
        // update refrenceId In redux
        const getDebtorData = await fetchSingleDebtor(customerDetails?.id);

        // update customer details with refId
        const updateCustomerDetails = {
          ...customerDetails,
          debtorReferenceId: getDebtorData?.debtor?.debtorReferenceId,
        };
        dispatch(updateCustomerDetailsAction(updateCustomerDetails));
        handleNext(updatedOrderResult.id);
        dispatch(setSecondStepVerified(true));
      } catch (error) {
        setApiStatus({
          isError: true,
          message: error.toString(),
        });
      }
    };

    const handleDocumentUploadSubmit = (data: UploadDocumentFormValuesInterface) => {
      dispatch(addDocumnentDetails(data));
      setStepForm({
        ...stepForm,
        documentData: data,
      });
      void router.push({ route: routes.confirmTransaction });
    };

    const getStepContent = (currentStep: number) => {
      switch (currentStep) {
        case 0:
          return (
            <CustomerFormPartial
              isDesktop={isDesktop}
              onSubmit={handleCustomerFormSubmit}
              onValueChange={customerValuesCallback}
              setChangesDetected={setChangesDetected}
            />
          );
        case 1:
          return (
            <PaymentFormPartial
              isDesktop={isDesktop}
              onSubmit={handlePaymentFormSubmit}
              onValueChange={paymentValuesCallback}
              setChangesDetected={setChangesDetected}
            />
          );
        case 2:
          return (
            <UploadDocumentFormPartial
              isDesktop={isDesktop}
              onSubmit={handleDocumentUploadSubmit}
              setChangesDetected={setChangesDetected}
            />
          );
        default:
          return 'unknown step';
      }
    };
    return (
      <DashboardLayout title="Invoice Creation" showMenus={false} stepper={true} innerPageTitle={false}>
        <StepHeaderPartial steps={steps} activeStep={activeStep} handleBack={handleBack} handleExit={handleExit} />
        <Grid container padding="18px" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Grid item xs={12}>
            <StepperComponent steps={steps} activeStep={activeStep} />
            {activeStep === steps.length ? (
              <Typography variant="h3" align="center">
                Thank You
              </Typography>
            ) : (
              <>{getStepContent(activeStep)}</>
            )}
          </Grid>
        </Grid>
        
        {isExitModalOpen ? (
          <ExitPaymentModal handleConfirm={handleExitAction} handleCancel={() => setIsExitModalOpen(false)} />
        ) : (
          ''
        )}
        {isOpenModal ? (
          <DebtorModalPartial handleConfirm={handleNewCustomer} handleCancel={() => setIsOpenModal(false)} />
        ) : (
          ''
        )}
        <FormAlert
          open={apiStatus?.isError}
          message={apiStatus?.message}
          severity="error"
          autoHideDuration={3000}
          onClose={resetError}
        />
      </DashboardLayout>
    );
  },
);
