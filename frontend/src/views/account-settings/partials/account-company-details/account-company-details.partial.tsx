import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { useAccountCompanyDetails } from 'views/account-settings/hooks';
import { AccountUserInterface } from 'views/account-settings/interfaces';
import { AccountAccordian } from 'views/account-settings/partials';
import { useAccountCompanyDetailsStyles } from 'views/account-settings/partials/account-company-details/account-company-details.styles';
import { AccountUserTypeEnum } from 'views/company-register/enum';

interface AccountCompanyDetailsPropsInterface {
  isDesktop?: boolean;
}

export const AccountCompanyDetails: FunctionComponent<AccountCompanyDetailsPropsInterface> = ({
  isDesktop,
}): React.ReactElement => {
  const classes = useAccountCompanyDetailsStyles({ isDesktop });
  const {
    accountRecord,
    handleBackButtonClick,
    transformAccountData,
  } = useAccountCompanyDetails();
  const { t } = useTranslation();
  const [legalRepresentativeUser, setLegalRepresentativeUser] = useState([]);
  const [beneficialOwnerUser, setBeneficialOwnerUser] = useState<AccountUserInterface[]>([]);

  useEffect(() => {
    if (accountRecord) {
      const accountRepresentativeUser = accountRecord.accountUsers.data.filter(
        (user) => user.accountUserType === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE
      );
      if (accountRepresentativeUser) {
        setLegalRepresentativeUser(accountRepresentativeUser);
      }
      const accountBeneficialUser = accountRecord.accountUsers.data.filter(
        (user) => user.accountUserType === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER,
      );
      if (accountBeneficialUser) {
        setBeneficialOwnerUser(accountBeneficialUser);
      }
    }
  }, [accountRecord]);

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" className={classes.accountCompanyDetailsPageTitle}>
            <div className={classes.accountCompanyDetailsBackIcon} onClick={handleBackButtonClick}>
              <ChevronLeftIcon />
            </div>
            <span>{t('account-settings.company-details.title')}</span>
          </Typography>
          {!isDesktop &&
            <Typography component="h2" className={classes.accountCompanyDetailsPageSubtitle}>
              {accountRecord && accountRecord.companyName}
            </Typography>}
        </Grid>
        {!isDesktop &&
          <Grid item xs={12}>
            <Typography component="p" className={classes.accountCompanyDetailsPageSubtitle2}>
              {t('account-settings.company-details.description1')}
            </Typography>
          </Grid>}
      </Grid>
      <Grid container>
        <Grid item xs={12}>
          <Box>
            <AccountAccordian title={t('account-settings.company-details.accordian1.title')} fields={transformAccountData(accountRecord, 0)} />
            <AccountAccordian title={t('account-settings.company-details.accordian2.title')} fields={transformAccountData(accountRecord, 1)} />
            <AccountAccordian title={t('account-settings.company-details.accordian6.title')} fields={transformAccountData(accountRecord, 2)} />
            <AccountAccordian title={t('account-settings.company-details.accordian3.title')} fields={transformAccountData(accountRecord, 3)} />
            <AccountAccordian title={t('account-settings.company-details.accordian4.title')} usersData={legalRepresentativeUser} subTitle={accountRecord.solePower ? t('account-settings.company-details.accordian4.sub-title') : t('account-settings.company-details.accordian4.sub-title1')}  />
            <AccountAccordian title={t('account-settings.company-details.accordian5.title')} usersData={beneficialOwnerUser} subTitle={t('account-settings.company-details.accordian5.sub-title')}  />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
