import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'modules/common/hooks';
import MailIcon from 'modules/common/icons/mail.svg';
import { FormAlert } from 'modules/forms/components';
import { FunctionComponent } from 'react';
import { Trans } from 'react-i18next';
import { useResendForgotPasswordMail } from 'views/forgot-password/hooks';

export interface ForgotPasswordConfirmInterface {
  email: string;
}

export const ForgotPasswordConfirmPartial: FunctionComponent<ForgotPasswordConfirmInterface> = (values) => {
  const { t } = useTranslation();
  const { handleResendForgotPasswordMail, isSent, error, resetState } = useResendForgotPasswordMail();
  const { email } = values;
  const theme = useTheme();
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
          pb: 6,
        }}
      />
      <Typography component="h1" variant="h3" sx={{ pb: 4 }}>
        {t('reset-requested')}
      </Typography>
      <Typography align="center" component="p" variant="body1" sx={{ pb: 6 }} color={theme.palette.text.secondary}>
        <Trans i18nKey="reset-password-mail-sent-text" values={{ email }}/>
      </Typography>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        size="large"
        fullWidth sx={{ mt: 3 }}
        onClick={() => handleResendForgotPasswordMail(email)}
      >
        {t('resend-email-cta')}
      </Button>
      <FormAlert
        open={typeof isSent === 'boolean'}
        error={error ? new Error(t('reset-password-mail-sent-failed')) : error }
        message={t('reset-password-mail-sent-success')}
        onClose={resetState}
      />
    </Box>
  );
};
