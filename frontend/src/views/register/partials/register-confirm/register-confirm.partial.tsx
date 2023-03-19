import Box from '@mui/material/Box';
import MuiLink from '@mui/material/Link';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import MailIcon from 'modules/common/icons/mail.svg';
import { FormAlert } from "modules/forms/components";
import { useEnhancedFormik } from "modules/forms/hooks";
import { FunctionComponent } from 'react';
import { Trans } from 'react-i18next'
import {useResendEmail} from "views/register/hooks/use-resend-email.hook";

export interface RegisterConfirmInterface {
  email: string;
}

export const RegisterConfirmPartial: FunctionComponent<RegisterConfirmInterface> = (values) => {
  const { t} = useTranslation();
  const { email } = values;
  const {resendEmail} = useResendEmail(email);
  const initialValues = {
    email
  }
  const {
    handleSubmit, status, resetStatus} = useEnhancedFormik({
    initialValues,
    onSubmit:resendEmail
  });

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <SvgIcon
        component={MailIcon}
        viewBox="0 0 240 240"
        sx={{
          width: { xs: 135, sm: 235 },
          height: { xs: 135, sm: 235 },
          pb: 8
        }}
      />
      <Typography component="h1" variant="h3" sx={{ pb: 3 }}>
        {t('confirm-mail-text')}
      </Typography>
      <Typography align="center" component="p" variant="subtitle1" sx={{ pb: 7 }}>
        <Trans i18nKey="registration-mail-sent-text" values={{ email }} />
      </Typography>
      <Typography align="center" component="p">
        {t('mail-not-received-text')}
      </Typography>
      <MuiLink variant="subtitle1" onClick={()=>{handleSubmit()}} style={{ cursor: 'pointer' }}>{t('resend-email-cta')}</MuiLink>
      <FormAlert
        open={status?.success}
        partialSuccess={true}
        message={t('resend-email-verification')}
        error={status?.error}
        onClose={resetStatus}
      />
    </Box>
  );
};

