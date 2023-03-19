import Autocomplete from '@mui/material/Autocomplete';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { AuthUserInterface } from 'modules/auth';
import { useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import React, { ReactElement, useEffect } from 'react';
import { useAppSettingsForm } from 'views/settings/hooks';
import { AppSettingsClasses, useAppSettingsStyles } from 'views/settings/partials/app-settings/app-settings.styles';

type AppSettingsPartialProps = {
  classes?: AppSettingsClasses;
  user: AuthUserInterface;
};

export const AppSettingsPartial = (props: AppSettingsPartialProps): ReactElement => {
  const classes = useAppSettingsStyles(props);
  const {
    onTimezoneChange,
    timezoneOptions,
    onLocaleChange,
    localeOptions,
    isSubmitting,
    status,
    resetStatus,
    values,
  } = useAppSettingsForm(props.user);
  const { t } = useTranslation();

  useEffect(() => () => resetStatus(), []);

  return (
    <Card classes={classes.card} raised>
      <CardHeader
        classes={classes.cardHeader}
        title={<Typography variant="h3">{t('settings-section-title')}</Typography>}
      />
      <CardContent classes={classes.cardContent}>
        <Grid container rowSpacing={2} columnSpacing={3}>
          <>
            <Grid item xs={12} xl={8}>
              <Autocomplete
                disableClearable
                id="timezones-autocomplete"
                value={values.timezone}
                options={timezoneOptions}
                renderInput={(params) => (
                  <TextField {...params} name="timezone" label={t('timezone-label-text')} variant="outlined"/>
                )}
                onChange={onTimezoneChange}
                loading={isSubmitting}
                disabled={isSubmitting}
              />
            </Grid>
          </>

          <Grid item xs={12} xl={8}>
            <Autocomplete
              disableClearable
              id="languages-autocomplete"
              value={values.locale}
              options={localeOptions}
              renderInput={(params) => (
                <TextField {...params} name="locale" label={t('language-label-text')} variant="outlined"/>
              )}
              onChange={onLocaleChange}
              loading={isSubmitting}
              disabled={isSubmitting}
              isOptionEqualToValue={(option, value) => option.id === value.id}
            />
          </Grid>
        </Grid>
      </CardContent>
      <FormAlert
        open={!!status}
        message={t('settings-update-success')}
        error={status?.error}
        onClose={resetStatus}
      />
    </Card>
  );
};
