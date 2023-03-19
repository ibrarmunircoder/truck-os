import { Grid, Paper, Stack, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { authorDateOnChangeHandler } from 'modules/example/author';
import { EXAMPLE_FORM_FIELD_MAX_LENGTH } from 'modules/example/constants';
import { AuthorGenderEnum } from 'modules/example/enums';
import { FormAlert } from 'modules/forms/components';
import { DateField } from 'modules/forms/components/date-field';
import { RadioButtonGroup } from 'modules/forms/components/radio-button-group/radio-button-group.component';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { RadiosData } from 'modules/forms/interfaces';
import React from 'react';
import routes from 'routes';
import { useAuthorEditFormSchema } from 'views/author-edit/hooks';
import { AuthorEditFormValuesInterface } from 'views/author-edit/interfaces';
import { useAuthorEditFormStyles } from 'views/author-edit/partials/author-edit-form/author-edit-form.styles';

interface AuthorEditFormPartialInterface {
  onSubmit: (formValues: AuthorEditFormValuesInterface) => void;
  initialValues: AuthorEditFormValuesInterface;
}

export const AuthorEditFormPartial: React.FC<AuthorEditFormPartialInterface> = (props) => {
  const { onSubmit, initialValues } = props;
  const { t } = useTranslation();
  const router = useRouter();
  const classes = useAuthorEditFormStyles();

  const {
    setFieldValue,
    handleSubmit,
    handleChange,
    values,
    visibleErrors,
    handleBlur,
    isSubmitting,
    status,
    resetStatus,
    handleReset,
  } = useEnhancedFormik({
    initialValues,
    onSubmit,
    validationSchema: useAuthorEditFormSchema(),
  });

  const genderRadiosData: RadiosData[] = [
    {
      label: t('author-create.gender.male'),
      value: AuthorGenderEnum.MALE,
      radioProps: {
        size: 'small',
      },
    },
    {
      label: t('author-create.gender.female'),
      value: AuthorGenderEnum.FEMALE,
      radioProps: {
        size: 'small',
      },
    },
    {
      label: t('author-create.gender.other'),
      value: AuthorGenderEnum.OTHERS,
      radioProps: {
        size: 'small',
      },
    },
  ];

  return (
    <Paper classes={classes.paper}>
      <Grid container justifyContent="space-between">
        <Typography variant="h5" color="primary">
          {t('author-create.update-title')}
        </Typography>
      </Grid>

      <form onSubmit={handleSubmit} className={classes.formSection} autoComplete="off">
        {status && (
          <FormAlert
            open
            error={status.error}
            message={t('author-create.updated-successfully-alert')}
            onClose={resetStatus}
          />
        )}

        <Grid container rowSpacing={2} columnSpacing={6}>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="name"
              label={t('author-create.name')}
              value={values.name}
              helperText={visibleErrors.name}
              error={Boolean(visibleErrors.name)}
              inputProps={{ maxLength: EXAMPLE_FORM_FIELD_MAX_LENGTH }}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="surname"
              label={t('author-create.surname')}
              value={values.surname}
              helperText={visibleErrors.surname}
              error={Boolean(visibleErrors.surname)}
              inputProps={{ maxLength: EXAMPLE_FORM_FIELD_MAX_LENGTH }}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="age"
              type="number"
              label={t('author-create.age')}
              value={values.age}
              helperText={visibleErrors.age}
              error={Boolean(visibleErrors.age)}
              fullWidth
              autoFocus={true}
              onReset={handleReset}
              onBlur={handleBlur}
              inputProps={{
                readOnly: true,
              }}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <DateField
              value={values.birthDate}
              onChange={(date) => authorDateOnChangeHandler(date, setFieldValue)}
              disableFuture
              textFieldProps={{
                variant: 'standard',
                name: 'birthDate',
                label: t('author-create.birthDate'),
                helperText: visibleErrors.birthDate,
                error: Boolean(visibleErrors.birthDate),
                fullWidth: true,
                autoFocus: true,
                onReset: handleReset,
                onBlur: handleBlur,
              }}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="email"
              label={t('author-create.email')}
              value={values.email}
              helperText={visibleErrors.email}
              error={Boolean(visibleErrors.email)}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <RadioButtonGroup
              name="gender"
              row
              label={t('author-create.gender.label')}
              value={values.gender}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
              radiosData={genderRadiosData}
            />
          </Grid>
          <Grid item md={12} sx={{ mt: 3.5 }}>
            <Typography variant="h6" color="primary" className={classes.addressTitle}>
              {t('author-create.address.label')}
            </Typography>
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="address.street"
              label={t('author-create.address.street')}
              value={values.address.street}
              helperText={visibleErrors.address?.street}
              error={Boolean(visibleErrors.address?.street)}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="address.houseNumber"
              label={t('author-create.address.houseNumber')}
              value={values.address.houseNumber}
              helperText={visibleErrors.address?.houseNumber}
              error={Boolean(visibleErrors.address?.houseNumber)}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="address.zipCode"
              label={t('author-create.address.zipCode')}
              value={values.address.zipCode}
              helperText={visibleErrors.address?.zipCode}
              error={Boolean(visibleErrors.address?.zipCode)}
              type={'number'}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="address.city"
              label={t('author-create.address.city')}
              value={values.address.city}
              helperText={visibleErrors.address?.city}
              error={Boolean(visibleErrors.address?.city)}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
          <Grid item md={5} xs={12}>
            <TextField
              variant="standard"
              name="address.country"
              label={t('author-create.address.country')}
              value={values.address.country}
              helperText={visibleErrors.address?.country}
              error={Boolean(visibleErrors.address?.country)}
              fullWidth
              autoFocus={true}
              onChange={handleChange}
              onReset={handleReset}
              onBlur={handleBlur}
            />
          </Grid>
        </Grid>

        <Stack spacing={2} direction="row" sx={{ mt: 3.5 }}>
          <Button disabled={isSubmitting} type="submit" variant="contained" color="primary">
            {t('author-create.saveButton')}
          </Button>
          <Button variant="outlined" color="error" onClick={() => router.push({ route: routes.exampleAuthors })}>
            {t('author-create.cancelButton')}
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};
