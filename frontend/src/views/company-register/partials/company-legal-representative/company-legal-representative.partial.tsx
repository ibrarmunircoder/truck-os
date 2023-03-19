/* eslint-disable @typescript-eslint/no-empty-function */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { useFormikContext } from 'formik';
import { QuestionOption } from 'modules/common/components';
import { useTranslation } from 'modules/common/hooks';
import React, { FunctionComponent } from 'react';
import { CompanyHeader } from 'views/company-register/partials/company-header/company-header.partial';
import { useCompanyLegalRepresentativeStyles } from 'views/company-register/partials/company-legal-representative/company-legal-representative.styles';
import { ICompanyLegalRepresentativeFormModel } from 'views/company-register/utils';

interface ICompanyLegalRepresentativeProps {
  formModel: ICompanyLegalRepresentativeFormModel;
}

export const CompanyLegalRepresentative: FunctionComponent<ICompanyLegalRepresentativeProps> = ({
  formModel,
}): React.ReactElement => {
  const { isLegalRepresentative, representativePower } = formModel.formField;
  const classes = useCompanyLegalRepresentativeStyles();
  const { getFieldProps, setFieldValue } = useFormikContext();
  const { t } = useTranslation();

  return (
    <Box className={classes.companyLegalInfoFormContainer}>
      <Grid container>
        <Grid item xs={12}>
          <CompanyHeader title={t('company-register.step4.title')} />
        </Grid>
      </Grid>
      <Grid container flexDirection={{xs : 'row-reverse'}} columnSpacing={3}>
        <Grid item xs={12} lg={6}>
          <Grid container>
            <Grid item xs={12}>
              <p className={classes.companyLegalRepresentativeDescription}>{t('company-register.step4.subtitle')}</p>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Grid container>
            <Grid item xs={12}>
              <QuestionOption
                {...getFieldProps(isLegalRepresentative.name)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue(isLegalRepresentative.name, event.target.value === 'true')
                }
                title={t('company-register.step4.question1.title')}
                description={t('company-register.step4.question1.description')}
                options={[
                  { value: true, label: t('company-register.step4.question1.option1') },
                  { value: false, label: t('company-register.step4.question1.option2') },
                ]}
              />
            </Grid>
            <Grid item xs={12}>
              <QuestionOption
                {...getFieldProps(representativePower.name)}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setFieldValue(representativePower.name, event.target.value === 'true')
                }
                style={{ marginTop: '13px' }}
                title={t('company-register.step4.question2.title')}
                description={t('company-register.step4.question2.description')}
                options={[
                  { value: true, label: t('company-register.step4.question2.option1') },
                  { value: false, label: t('company-register.step4.question2.option2') },
                ]}
              />
            </Grid>
          </Grid>
        </Grid>


      </Grid>
    </Box>
  );
};
