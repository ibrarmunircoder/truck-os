import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid, { GridProps } from '@mui/material/Grid';
import clsx from 'clsx';
import { useLoginProvidersStyles } from 'modules/auth/components/login-providers/login-providers.styles';
import { useSsoProviderLogin, useSsoProviders } from 'modules/auth/hooks';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FunctionComponent } from 'react';

export interface LoginProvidersInterface extends GridProps {}

export const LoginProviders: FunctionComponent<LoginProvidersInterface> = (props) => {
  const classes = useLoginProvidersStyles();
  const { providersById } = useSsoProviders();
  const { handleSsoProviderLogin } = useSsoProviderLogin();
  const router = useRouter();
  const { t } = useTranslation();

  // We have this commented on purpose, for translations
  // t('social-login.google')
  // t('social-login.linkedin')
  // t('social-login.apple')

  return (
    <Grid container className={classes.root} {...props} rowSpacing={2}>
      {Object.entries(providersById).map(([id, { Icon, titleTranslationKey, name }]) => (
        <Grid key={id} item xs={12}>
          <Button
            key={id}
            variant="outlined"
            size="large"
            classes={{
              root: clsx(classes.button),
            }}
            onClick={() => handleSsoProviderLogin(id, router.locale)}
            className={`social-login-${name.toLocaleLowerCase()}`}
            data-cy={`social-login-${name.toLocaleLowerCase()}`}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', pt: 0.5 }}>
              <Icon />
            </Box>
            <Box sx={{ flexGrow: 1 }}>{t(titleTranslationKey)}</Box>
          </Button>
        </Grid>
      ))}
    </Grid>
  );
};
