import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Form, Formik } from 'formik';
import { DashboardLayout } from 'layouts/dashboard';
import { withAuth } from 'modules/auth/hocs';
import { RoqLink } from 'modules/common/components';
import { Button } from 'modules/common/components/button';
import { StepperComponent } from 'modules/common/components/stepper';
import { useTranslation } from 'modules/common/hooks';
import { colors } from 'modules/common/utils/colors';
import React from 'react';
import routes from 'routes';
import { useAccountQuery, useCompanyRegisterFormSchema, useCompanyStep } from 'views/company-register/hooks';
import {
  CompanyAddOwner,
  CompanyAddRepresentative,
  CompanyBankInfo,
  CompanyBasicInfo,
  CompanyDocumentUpload,
  CompanyLegalRepresentative,
  CompanyVerificationComplete,
  CompanyVerificationInfo,
} from 'views/company-register/partials';
import {
  buttonBaseStyles,
  companyAddOwnerFormModel,
  companyAddRepresentativeFormModel,
  companyBankInfoFormModel,
  companyBasicInfoFormModel,
  companyDocumentUploadFormModel,
  companyLegalRepresentativeFormModel,
  disabledButtonStyles,
} from 'views/company-register/utils';

const useCompanyRegisterStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    backgroundColor: '#fff',
    [theme.breakpoints.up('md')]: {
      maxWidth: '1000px',
      margin: '0px auto',
      paddingTop: '40px',
    },
    [theme.breakpoints.down('md')]: {
      padding: '12px',
    },
  },
  companyRegisterWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: 'calc(100vh - 206px)',
    [theme.breakpoints.up('md')]: {
      minHeight: '100%',
    },
  },
  companyRegisterBtnGroup: {
    margin: '12px',
    [theme.breakpoints.up('md')]: {
      margin: '30px 15px 15px',
    },
  },
  companyRegisterCloseIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: '15px',
    [theme.breakpoints.up('md')]: {
      marginBottom: '30px',
    },
  },
}));

const _renderStepContent = (viewStep: number): React.ReactElement => {
  switch (viewStep) {
    case 0:
      return <CompanyBasicInfo formModel={companyBasicInfoFormModel} />;
    case 1:
      return <CompanyDocumentUpload formModel={companyDocumentUploadFormModel} />;
    case 2:
      return <CompanyBankInfo formModel={companyBankInfoFormModel} />;
    case 3:
      return <CompanyLegalRepresentative formModel={companyLegalRepresentativeFormModel} />;
    case 4:
      return <CompanyAddRepresentative formModel={companyAddRepresentativeFormModel} />;
    case 5:
      return <CompanyAddOwner formModel={companyAddOwnerFormModel} />;
    case 6:
      return <CompanyVerificationInfo />;
    case 7:
      return <CompanyVerificationComplete />;
    default:
      return <div>Not Found</div>;
  }
};

export const CompanyRegisterView = withAuth()(
  (): React.ReactElement => {
    const {
      viewActiveStep,
      activeStep,
      handleBackClick,
      handleSubmit,
      isSubmitButtonDisabled,
      steps,
      buttonConfig,
    } = useCompanyStep();
    const { account: initialValues } = useAccountQuery();
    const validationSchema = useCompanyRegisterFormSchema();
    const classes = useCompanyRegisterStyles();
    const { t } = useTranslation();
    const currentValidationSchema = validationSchema[viewActiveStep];

    const displayBackButton = () => {
      if (viewActiveStep > 0) {
        return (
          <Button
            sx={{
              ...disabledButtonStyles,
              backgroundColor: `${colors.lightGray} !important`,
              marginTop: '12px',
              color: `${colors.darkGray} !important`,
            }}
            type="button"
            variant="contained"
            fullWidth
            text={t('company-register.back-btn')}
            onClick={handleBackClick}
          />
        );
      }

      return null;
    };

    return (
      <DashboardLayout title="Company Registration" showMenus={false} stepper={true} innerPageTitle={false}>
        <main className={classes.root}>
          <div className={classes.companyRegisterCloseIcon}>
            <RoqLink href={{ route: routes.paymentDashboard }}>
              <img src="/static/icons/x-close.svg" alt="Close icon" />
            </RoqLink>
          </div>
          <Formik
            initialValues={initialValues}
            validateOnMount={true}
            validationSchema={currentValidationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting, errors, isValid }) => (
              <Form>
                <StepperComponent showTitle={false} steps={steps} activeStep={activeStep} />
                <Box className={classes.companyRegisterWrapper}>
                  {_renderStepContent(viewActiveStep)}
                  <div className={classes.companyRegisterBtnGroup}>
                    <Button
                      disabled={!isValid || Object.keys(errors).length > 0 || isSubmitting || isSubmitButtonDisabled}
                      sx={
                        !isValid || Object.keys(errors).length > 0 || isSubmitting || isSubmitButtonDisabled
                          ? { ...disabledButtonStyles }
                          : { ...buttonBaseStyles }
                      }
                      type="submit"
                      variant="contained"
                      fullWidth
                      text={buttonConfig[viewActiveStep] || t('company-register.submit.next')}
                    />
                    {displayBackButton()}
                  </div>
                </Box>
              </Form>
            )}
          </Formik>
        </main>
      </DashboardLayout>
    );
  },
);
