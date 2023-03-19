import { Box, Button } from '@mui/material';
import { useSsoProviders } from 'modules/auth/hooks';
import { useTranslation } from 'modules/common/hooks';
import { FunctionComponent, useCallback } from 'react';
import { useSsoAuthStyles } from 'views/settings/partials/sso-auth/sso-auth.styles';

export interface SSOAuthPartialInterface {
  providerId: string,
  onDisconnect: (providerId: string) => void,
}

export const SsoAuthPartial: FunctionComponent<SSOAuthPartialInterface> = ({
  providerId,
  onDisconnect,
}) => {
  const classes = useSsoAuthStyles();
  const { t } = useTranslation();
  const { providersById } = useSsoProviders();
  const handleButtonClick = useCallback(() => {
    onDisconnect(providerId);
  }, [ providerId, onDisconnect ])

  if (!providersById[providerId]) {
    return null;
  }
  const { Icon } = providersById[providerId];

  return (
    <Box className={classes.root}>
      <Button
        variant="outlined"
        startIcon={<Icon className={classes[`${providerId}Icon`]}/>}
        onClick={handleButtonClick}
        className={classes.disconnectButton}
      >
        {t('sso-disconnect')}
      </Button>
    </Box>
  )
}
