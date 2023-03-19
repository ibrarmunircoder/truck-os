import { InfoOutlined } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Dialog } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useMatchMediaQuery } from 'layouts/dashboard/hooks';
import { useTranslation } from 'modules/common/hooks';
import Link from 'next/link';
import React, { FunctionComponent, useEffect, useState } from 'react';
import NumberFormat from 'react-number-format';
import { useAccountBasicSettingsInfo, useAccountCompanyDetails } from 'views/account-settings/hooks';
import { AccountUserInterface } from 'views/account-settings/interfaces';
import { AccountFieldSlot } from 'views/account-settings/partials';
import { useAccountAccordianStyles } from 'views/account-settings/partials/account-accordian/account-accordian.styles';

interface AccountAccordianPropsInterface {
  title: string;
  subTitle?: string;
  usersData?: AccountUserInterface[];
  fields?: {
    label: string;
    value: string | boolean;
    href?: string | null;
  }[];
}

export const AccountAccordian: FunctionComponent<AccountAccordianPropsInterface> = ({
  title,
  fields,
  subTitle,
  usersData,
}): React.ReactElement => {
  const isDesktop = useMatchMediaQuery();
  const classes = useAccountAccordianStyles({ isDesktop });
  const [virtualIbanValue, setVirtualIbanValue] = useState({});
  const { t } = useTranslation();
  const { transformAccountUserData, kycRedirection } = useAccountCompanyDetails();
  const { open, handleDialogClose, handleContactUs, telephoneAnchorRef } = useAccountBasicSettingsInfo();

  useEffect(() => {
    if (fields) {
      const virtualIban = fields.find((field) => field?.label === t('account-settings.company-details.virtualiban'));
      if (virtualIban) {
        setVirtualIbanValue(virtualIban?.value);
      }
    }
  }, [fields]);

  return (
    <>
      <Accordion className={classes.accountCompanyDetailsAccordian}>
        <AccordionSummary
          className={classes.accordionSummary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography component="h3" className={classes.accountCompanyDetailsAccordianTitle}>
            {title}
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {subTitle && <Typography className={classes.subTitle}>{subTitle}</Typography>}
          {usersData?.length > 0 ? (
            usersData.map((user, index) => {
              const fieldsData = transformAccountUserData(user, 5);
              return (
                <Box key={index} mt={3}>
                  {fieldsData?.map((field) => (
                    <AccountFieldSlot key={field.label} label={field.label} value={field.value} />
                  ))}
                </Box>
              );
            })
          ) : usersData?.length === 0 ?
            <Box mt={2}>
              <AccountFieldSlot label={t('account-settings.company-details.name')} value={''} />
              <AccountFieldSlot label={t('account-settings.company-details.email')} value={''} />
              <AccountFieldSlot label={t('account-settings.company-details.birth-date')} value={''} />
            </Box>
            : (
              title === t('account-settings.company-details.accordian6.title') ? (<div className={clsx(classes.accountCompanyDetailsAccordianTitle, classes.fontSmall)}>
                <Typography>
                  <Box>
                    <Typography className={classes.invoiceDetailText} marginBottom={3}>
                      {t('account-settings.company-details.invoice-description1')}
                    </Typography>

                    <Typography className={classes.invoiceDetailText} marginBottom={3}>
                      {t('account-settings.company-details.invoice-description2')}
                    </Typography>

                    <Typography className={classes.invoiceDetailText} margin={0}>
                      {fields?.map((field) => (
                        <div key={field.label} className={classes.invoiceInfo}>
                          {field.label}: {
                            field.label === t('account-settings.company-details.recipient') ? field.value ? `${field.value} via walbing` : t('account-settings.not-available') :
                              field.label === t('account-settings.company-details.virtualiban') ? field.value ?
                                <NumberFormat
                                  format="#### #### #### #### #### ##"
                                  isNumericString={true}
                                  displayType="text"
                                  value={typeof field.value === 'string' ? field.value : ''}
                                /> : t('account-settings.not-available') :
                                field.value ? field.value : t('account-settings.not-available')}
                        </div>
                      ))}
                    </Typography>
                    <Typography className={classes.infoText}>
                      <InfoOutlined fontSize="small" />
                      <span>{t('account-settings.company-details.invoice-description3')}</span>
                    </Typography>
                  </Box>
                </Typography>
              </div>)
                :
                <Box>
                  {fields?.map((field) => (
                    <AccountFieldSlot key={field.label} label={field.label} value={field.value} href={field.href} />
                  ))}
                </Box>
            )}
          {title === t('account-settings.company-details.accordian2.title') &&
            (virtualIbanValue ? (
              <div className={clsx(classes.accountCompanyDetailsAccordianTitle, classes.fontSmall)}>
                <Typography className={classes.infoText}>
                  <InfoOutlined fontSize="small" />
                  <Box>
                    <Typography className={classes.infoIbanText} margin={0}>
                      {t('account-settings.company-details.iban-description')}
                    </Typography>
                    <span>
                      {t('account-settings.company-details.iban-description1')}
                      <span className={clsx(classes.textLink, classes.ml5)} onClick={handleContactUs}>
                        {t('account-settings.company-details.iban-contact-link')}
                      </span>
                    </span>
                  </Box>
                </Typography>
              </div>
            ) : (
              <div className={clsx(classes.accountCompanyDetailsAccordianTitle, classes.fontSmall)}>
                <Typography className={classes.infoText}>
                  <InfoOutlined fontSize="small" />
                  <span>
                    {t('account-settings.company-details.please')}
                    <Link href={kycRedirection}>
                      <a className={clsx(classes.textLink, classes.ml5)}>
                        {t('account-settings.company-details.please-kyc-process')}
                      </a>
                    </Link>
                    {t('account-settings.company-details.iban-number-instruction')}
                    <span className={clsx(classes.textLink, classes.ml5)} onClick={handleContactUs}>
                      {t('account-settings.company-details.iban-contact-link')}
                    </span>
                  </span>
                </Typography>
              </div>
            ))}
        </AccordionDetails>
      </Accordion>
      <a ref={telephoneAnchorRef} href="tel:+4922198819386" hidden={true}>
        +49 221 98819386
      </a>
      {open && (
        <Dialog className={classes.contactDialog} open={open} title="" onClose={handleDialogClose}>
          <Box padding={3} className={classes.dialogBox}>
            <Typography component="h2" className={classes.dialogContentTitle}>
              {t('account-settings.contact-modal.title')}
            </Typography>
            <p aria-label="plus 4 9 2 2 1 9 8 8 1 9 3 8 6" className={classes.dialogContentPhoneNumber}>
              +49 221 98819386
            </p>
            <Typography className={classes.dialogContentDescription} component="p">
              {t('account-settings.contact-modal.description')}
            </Typography>
          </Box>
        </Dialog>
      )}
    </>
  );
};
