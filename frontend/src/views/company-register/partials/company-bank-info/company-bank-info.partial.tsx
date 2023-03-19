import { TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { localeMapping } from 'configuration/app';
import { useFormikContext } from 'formik';
import { useAuth } from 'modules/auth/hooks';
import { InputField } from 'modules/common/components';
import { useTermsCondition, useTranslation } from 'modules/common/hooks';
import { colors } from 'modules/common/utils/colors';
import React, { FunctionComponent, useEffect } from 'react';
import InputMask from 'react-input-mask';
import { useAccountList } from 'views/company-register/hooks';
import { useCompanyBankInfoStyles } from 'views/company-register/partials/company-bank-info/company-bank-info.styles';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { ICompanyBankInfoFormModel, isError, isErrorMessage } from 'views/company-register/utils';

interface ICompanyBankInfoProps {
  formModel: ICompanyBankInfoFormModel;
}

const WalbingTruckOSTermsConditionTextAction = () => {
  const classes = useCompanyBankInfoStyles();
  const { handleTruckOSTermsClick, handlePaymentProviderTermsConditionsClick, locale } = useTermsCondition();
  if (locale === localeMapping.en) {
    return (
      <Typography component="p" className={classes.companyBankInfoDescription}>
        You agree to the
        <Typography
          component="span"
          onClick={handlePaymentProviderTermsConditionsClick}
          className={classes.paymentTermTruckOSTerm}
        >
          Walbing
        </Typography>
        &
        <Typography component="span" onClick={handleTruckOSTermsClick} className={classes.paymentTermTruckOSTerm}>
          truckOS
        </Typography>
        platform terms and conditions.
      </Typography>
    );
  }
  return (
    <Typography component="p" className={classes.companyBankInfoDescription}>
      Du erklärst dich mit den Allgemeinen Geschäftsbedingungen der Plattform
      <Typography
        component="span"
        onClick={handlePaymentProviderTermsConditionsClick}
        className={classes.paymentTermTruckOSTerm}
      >
        Walbing
      </Typography>
      &
      <Typography component="span" onClick={handleTruckOSTermsClick} className={classes.paymentTermTruckOSTerm}>
        truckOS
      </Typography>
      einverstanden.
    </Typography>
  );
};

export const CompanyBankInfo: FunctionComponent<ICompanyBankInfoProps> = ({ formModel }): React.ReactElement => {
  const { companyBIC, companyIBAN, welbingTerms } = formModel.formField;
  const classes = useCompanyBankInfoStyles();
  const { getFieldProps, values, touched, errors, dirty, setFieldError } = useFormikContext();
  const { handleFetchAccountLists } = useAccountList();
  const { user } = useAuth();
  const { t } = useTranslation();

  useEffect(() => {
    if (dirty && values[companyIBAN.name]) {
      const getAccounts = async () => {
        const accounts = await handleFetchAccountLists({
          iban: { equalTo: values[companyIBAN.name] as string },
          userId: { notEqualTo: user.id },
        });
        if (accounts.totalCount) {
          setFieldError(companyIBAN.name, 'This IBAN already exists');
        }
      };
      void getAccounts();
    }
  }, [values, touched]);

  const generateCheckboxLabel = () => (
    <article>
      <Typography component="p" style={{ marginTop: 0 }} className={classes.companyBankInfoDescription}>
        {t('company-register.step3.checkbox-label-1')}
      </Typography>
      <WalbingTruckOSTermsConditionTextAction />
      <Typography component="p" className={classes.companyBankInfoDescription}>
        {t('company-register.step3.checkbox-label-3')}
      </Typography>
      <Typography component="p" className={classes.companyBankInfoDescription}>
        {t('company-register.step3.checkbox-label-4')}
      </Typography>
    </article>
  );

  return (
    <Box className={classes.companyBankInfoFormContainer}>
      <Grid container>
        <Grid item xs={12}>
          <CompanyHeader title={t('company-register.step3.title')} />
        </Grid>
      </Grid>
      <Grid container direction="row" justifyContent="center" alignItems="flex-start" columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <Grid item xs={12}>
              <InputMask
                mask="**99 9999 9999 9999 9999 99"
                maskPlaceholder=" "
                alwaysShowMask={false}
                {...getFieldProps(companyIBAN.name)}
              >
                {(inputProps) => (
                  <TextField
                    {...inputProps}
                    type="text"
                    fullWidth
                    className={classes.formControl}
                    id={companyIBAN.name}
                    label={t('company-register.step3.iban')}
                    variant="outlined"
                    helperText={isErrorMessage(companyIBAN.name, errors)}
                    error={isError(companyIBAN.name, errors, touched)}
                    value={values[companyIBAN.name]}
                  />
                )}
              </InputMask>
            </Grid>
            <Grid item xs={12}>
              <InputField
                type="text"
                fullWidth
                id={companyBIC.name}
                label={t('company-register.step3.bic')}
                variant="outlined"
                helperText={isErrorMessage(companyBIC.name, errors)}
                error={isError(companyBIC.name, errors, touched)}
                {...getFieldProps(companyBIC.name)}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container direction="row" justifyContent="center" alignItems="center" spacing={1}>
            <FormControlLabel
              {...getFieldProps(welbingTerms.name)}
              className={classes.companyBankInfoCheckboxControl}
              value="end"
              labelPlacement="end"
              checked={values[welbingTerms.name]}
              control={
                <Checkbox
                  sx={{
                    color: colors.primary,
                    '&.Mui-checked': {
                      color: colors.primary,
                    },
                  }}
                />
              }
              label={generateCheckboxLabel()}
            />
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
