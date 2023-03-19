import { InfoOutlined, Verified } from '@mui/icons-material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import clsx from 'clsx';
import { useTranslation } from 'modules/common/hooks';
import { colors } from 'modules/common/utils/colors';
import Link from 'next/link';
import React, { FunctionComponent } from 'react';
import NumberFormat from 'react-number-format';
import { useAccountFieldSlotStyles } from 'views/account-settings/partials/account-field-slot/account-field-slot.styles';

interface AccountFieldSlotPropsInterface {
  label: string;
  value: string | boolean;
  href?: string | null;
}

export const AccountFieldSlot: FunctionComponent<AccountFieldSlotPropsInterface> = ({
  label,
  value,
  href = null,
}): React.ReactElement => {
  const classes = useAccountFieldSlotStyles();
  const { t } = useTranslation();
  return (
    <Box display="flex">
      <Typography
        flexBasis="140px"
        component="p"
        borderRight={`2px solid ${colors.lightGray2}`}
        className={classes.accountFieldSlotTitle}
      >
        <span className={label === t('virtual-iban.name') && classes.greenText}>{label}</span>
      </Typography>
      {(label === t('account-settings.company-details.iban') && value !== null) ||
        (label === t('virtual-iban.name') && value !== null) ? (
        <Typography
          flexBasis={{ xs: '200px', md: '300px', lg: '400px' }}
          component="p"
          className={classes.accountFieldSlotSubtitle}
        >
          {label === t('account-settings.company-details.iban') ? (
            <span>{value || t('account-settings.not-available')}</span>
          ) : (label === t('virtual-iban.name') && value) ? (
            <NumberFormat
              format="#### #### #### #### #### ##"
              isNumericString={true}
              displayType="text"
              className={classes.greenText}
              value={typeof value === 'string' ? value : ''}
            />
          ) :
            <span>{t('account-settings.not-available')}</span>
          }
        </Typography>
      ) : label === t('account-settings.company-details.verification-status') && value === true ? (
        <Typography
          flexBasis={{ xs: '200px', md: '300px', lg: '400px' }}
          component="p"
          className={clsx(classes.accountFieldSlotSubtitle, classes.greenText)}
        >
          <span className={classes.verificationTitle}>
            <Verified /> <span>{t('account-settings.account-verified.text1')}</span>
          </span>
        </Typography>
      ) : label === t('account-settings.company-details.verification-status') && value === false ? (
        <Typography
          flexBasis={{ xs: '200px', md: '300px', lg: '400px' }}
          component="p"
          className={clsx(classes.accountFieldSlotVerifcationSubtitle)}
        >
          <span className={classes.verificationTitle}>
            <InfoOutlined />{' '}
            <span>
              {t('account-settings.account-verified.text2')}{' '}
              <Link href={href}>
                <a className={clsx(classes.textLink)}>{t('account-settings.account-verified.text3')}</a>
              </Link>
            </span>
          </span>
        </Typography>
      ) : label === t('account-settings.company-details.address') ? <Typography
        flexBasis={{ xs: '200px', md: '300px', lg: '400px' }}
        component="p"
        className={classes.accountFieldSlotSubtitle}
      >
        {
          typeof value === 'string' ?
            value.split('|').map((addressValue, index) => <Typography key={index} className={classes.addressFieldText}>{addressValue || t('account-settings.not-available')}</Typography>) :
            ''
        }
      </Typography>
        : (
          <Typography
            flexBasis={{ xs: '200px', md: '300px', lg: '400px' }}
            component="p"
            className={classes.accountFieldSlotSubtitle}
          >
            <span>{value || t('account-settings.not-available')}</span>
          </Typography>
        )}
    </Box>
  );
};
