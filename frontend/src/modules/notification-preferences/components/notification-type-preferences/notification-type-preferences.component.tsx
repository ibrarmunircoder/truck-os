import { Grid, Typography } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { useNotificationTypePreferencesStyles } from 'modules/notification-preferences/components/notification-type-preferences/notification-type-preferences.styles';
import { useNotificationTypeItem } from 'modules/notification-preferences/hook';
import { NotificationPreferencesTypeInterface } from 'modules/notification-preferences/notification-preferences.slice';
import { memo } from 'react';

interface Props {
  notificationType: NotificationPreferencesTypeInterface;
}

/* eslint-disable react/display-name */
// using memo here to avoid rerender parent switch states
export const NotificationTypePreferences: React.FC<Props> = memo((props) => {
  const { notificationType: type } = props;
  const classes = useNotificationTypePreferencesStyles(props);
  const { t } = useTranslation();

  // switch & check box states
  const { checkedAppNotification, checkedEmailNotification, handleSwitchChange, success, resetSuccess } =
    useNotificationTypeItem({ type });

  return (
    <Grid container>
      <Grid className={classes.cardSubtitle} item xs={12} sx={{ paddingLeft: 3 }}>
        <Typography>{t('notification-type', { context: type.key })}</Typography>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          paddingLeft: 2,
          '&.MuiGrid-item': {
            paddingTop: 0,
          },
        }}
      >
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            className={classes.inputLabel}
            control={
              <Checkbox
                checked={checkedAppNotification}
                onChange={handleSwitchChange}
                name="checkedAppNotifications"
                color="secondary"
                defaultChecked
              />
            }
            label={t('roq-notification-text')}
          />
          <FormControlLabel
            className={classes.inputLabel}
            control={
              <Checkbox
                checked={checkedEmailNotification}
                onChange={handleSwitchChange}
                name="checkedEmailNotifications"
                color="secondary"
                defaultChecked
              />
            }
            label={t('email-notification-text')}
          />
        </FormGroup>
      </Grid>
      <FormAlert open={success} message={t('settings-update-success')} autoHideDuration={3000} onClose={resetSuccess} />
    </Grid>
  );
});
