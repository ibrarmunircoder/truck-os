import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { ActionOverlay } from 'modules/action-overlay/components/action-overlay/action-overlay.component';
import { ActionOverlayButtons } from 'modules/action-overlay/components/action-overlay-buttons/action-overlay-buttons.component';
import { USER_NAME_INPUT_PROPS } from 'modules/auth/constants';
import { createUserInitials } from 'modules/auth/utils/user-initials';
import { RoqLink } from 'modules/common/components';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { UserInterface } from 'modules/users/interfaces';
import React, { ReactElement, useCallback, useMemo, useState } from 'react';
import routes from 'routes';
import { useProfileUpdateForm } from 'views/profile/hooks';
import { AvatarUpdatePartial } from 'views/profile/partials/avatar-update/avatar-update.partial';
import {
  ProfileUpdateFormClasses,
  useProfileUpdateFormStyles,
} from 'views/profile/partials/profile-update-form/profile-update-form.styles';

type ProfileUpdateFormPartialProps = {
  classes?: ProfileUpdateFormClasses;
  editMode?: boolean;
  user: UserInterface;
};

const ProfileUpdateForm = (props): ReactElement => {
  const classes = useProfileUpdateFormStyles(props);
  const {
    formik: { handleChange, handleBlur, values, visibleErrors, setFieldValue },
  } = props;
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing={1} columnSpacing={5}>
      <Grid item sm={12}>
        <Typography className={classes.formGroupLabel} variant="caption" component="p">
          {t('profile-page.update-form-general-label')}
        </Typography>
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.first-name.name')}
          variant="standard"
          autoFocus={true}
          value={values.firstName}
          helperText={visibleErrors.firstName}
          error={Boolean(visibleErrors.firstName)}
          fullWidth
          inputProps={USER_NAME_INPUT_PROPS}
          onChange={handleChange('firstName')}
          onReset={() => setFieldValue('firstName', '')}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.last-name.name')}
          variant="standard"
          value={values.lastName}
          helperText={visibleErrors.lastName}
          error={Boolean(visibleErrors.lastName)}
          fullWidth
          inputProps={USER_NAME_INPUT_PROPS}
          onChange={handleChange('lastName')}
          onReset={() => setFieldValue('lastName', '')}
          onBlur={handleBlur}
        />
      </Grid>

      <Grid item sm={12}>
        <Typography className={classes.formGroupLabel} variant="caption" component="p">
          {t('profile-page.update-form-contact-details-label')}
        </Typography>
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.phone.name')}
          variant="standard"
          value={values.phone}
          helperText={visibleErrors.phone}
          error={Boolean(visibleErrors.phone)}
          fullWidth
          onChange={handleChange('phone')}
          onReset={() => setFieldValue('phone', '')}
          onBlur={handleBlur}
          disabled
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.email.name')}
          variant="standard"
          value={values.email}
          helperText={visibleErrors.email}
          error={Boolean(visibleErrors.email)}
          fullWidth
          onChange={handleChange('email')}
          onReset={() => setFieldValue('email', '')}
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12}>
        <Typography className={classes.formGroupLabel} variant="caption" component="p">
          {t('profile-page.update-form-employment-label')}
        </Typography>
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.company.name')}
          variant="standard"
          value={values.company}
          helperText={visibleErrors.company}
          error={Boolean(visibleErrors.company)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.position.name')}
          variant="standard"
          value={values.position}
          helperText={visibleErrors.position}
          error={Boolean(visibleErrors.position)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12}>
        <Typography className={classes.formGroupLabel} variant="caption" component="p">
          {t('profile-page-details.about-label')}
        </Typography>
      </Grid>

      <Grid item sm={12}>
        <TextField
          type="text"
          label={t('profile-page-details.about-label')}
          variant="standard"
          value={values.about}
          helperText={visibleErrors.about}
          error={Boolean(visibleErrors.about)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12}>
        <Typography className={classes.formGroupLabel} variant="caption" component="p">
          {t('profile-page.update-form-address-label')}
        </Typography>
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.street_address.name')}
          variant="standard"
          value={values.streetAddress}
          helperText={visibleErrors.streetAddress}
          error={Boolean(visibleErrors.streetAddress)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.zip_code.name')}
          variant="standard"
          value={values.zipCode}
          helperText={visibleErrors.zipCode}
          error={Boolean(visibleErrors.zipCode)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.house_number.name')}
          variant="standard"
          value={values.houseNumber}
          helperText={visibleErrors.houseNumber}
          error={Boolean(visibleErrors.houseNumber)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.city.name')}
          variant="standard"
          value={values.city}
          helperText={visibleErrors.city}
          error={Boolean(visibleErrors.city)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          type="text"
          label={t('input.country.name')}
          variant="standard"
          value={values.country}
          helperText={visibleErrors.country}
          error={Boolean(visibleErrors.country)}
          fullWidth
          onBlur={handleBlur}
          disabled
        />
      </Grid>
    </Grid>
  );
};

export const ProfileUpdateFormPartial = (props: ProfileUpdateFormPartialProps): ReactElement => {
  const { user, editMode } = props;
  const classes = useProfileUpdateFormStyles(props);
  const [overlay, setOverlay] = useState(editMode ? 'open' : null);
  const router = useRouter();
  const { t } = useTranslation();
  const initials = useMemo(() => createUserInitials(user), [user]);
  const switchToViewMode = useCallback(() => {
    void router.push({ route: routes.profile, query: { userId: user.id } });
  }, [router, user.id]);

  const { status, resetStatus, resetForm, formik, handleSubmit, isValid, isSubmitting, handleAvatarFileChange, dirty } =
    useProfileUpdateForm(user, { onSubmitSuccess: switchToViewMode });

  const handleOverlayClose = () => {
    setOverlay(null);
    resetForm();
    switchToViewMode();
  };
  const handleDrawerFormSuccess = () => handleOverlayClose();

  const profileUpdateFormoverlay = {
    title: t('edit'),
    subTitle: t('profile-page.subtitle'),
  };

  let fullName = '';
  if (user !== null) {
    fullName = `${user.firstName} ${user.lastName}`.trim();
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card elevation={1}>
          <CardContent>
            <Grid container>
              <Grid container item xs={12}>
                <Grid container item direction="row" flexGrow={1} xs={12} md={8}>
                  <CardHeader
                    classes={classes.cardHeader}
                    avatar={<AvatarUpdatePartial src={user.avatar} initials={initials} isUploading={isSubmitting} />}
                  />

                  <Grid item>
                    <Typography variant="h4" className={classes.userFullName}>
                      {fullName}
                    </Typography>
                    <Typography variant="body1" className={classes.userLocation}>
                      Berlin, Germany
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container item md={4} direction="row" justifyContent="flex-end" alignItems="center">
                  <input
                    accept="image/jpeg, image/jpg, image/png, image/bmp, image/gif"
                    className={classes.uploadInput}
                    id="avatar-upload-button-file"
                    multiple={false}
                    type="file"
                    onChange={handleAvatarFileChange}
                  />
                  <label htmlFor="avatar-upload-button-file">
                    {!dirty && (
                      <Button variant="outlined" classes={classes.editButton} component="span" sx={{ marginRight: 2 }}>
                        {t('link-text.change-avatar')}
                      </Button>
                    )}
                  </label>

                  {dirty && (
                    <Button
                      disabled={!isValid || isSubmitting || !dirty}
                      variant="contained"
                      classes={classes.saveButton}
                      type="submit"
                      sx={{ marginRight: 2 }}
                    >
                      {t('link-text.save-avatar')}
                    </Button>
                  )}

                  <RoqLink href={{ route: routes.profile, query: { userId: user.id, action: ['edit'] } }}>
                    <Button onClick={() => setOverlay('open')} variant="contained" startIcon={<EditIcon />}>
                      {t('edit')}
                    </Button>
                  </RoqLink>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid container item xs={12} rowGap={3} columnGap={10}>
                <Grid item xs="auto">
                  <Typography variant="body2" className={classes.label}>
                    {t('profile-page-details.company-label')}
                  </Typography>
                  <Typography variant="body1" className={classes.field}>
                    Oriental Carpet Trading Quality Company Ltd
                  </Typography>
                </Grid>

                <Grid item xs="auto">
                  <Typography variant="body2" className={classes.label}>
                    {t('profile-page-details.position-label')}
                  </Typography>
                  <Typography variant="body1" className={classes.field}>
                    Design Lead
                  </Typography>
                </Grid>

                <Grid item xs="auto">
                  <Typography variant="body2" className={classes.label}>
                    {t('email')}
                  </Typography>
                  <Typography variant="body1" className={classes.field}>
                    {user && user.email}
                  </Typography>
                </Grid>

                <Grid item xs="auto">
                  <Typography variant="body2" className={classes.label}>
                    {t('phone')}
                  </Typography>
                  <Typography variant="body1" className={classes.field}>
                    +49 173 5265855
                  </Typography>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" className={classes.label}>
                  {t('profile-page-details.address-label')}
                </Typography>
                <Typography variant="body1" className={classes.field}>
                  Brehmenstrasse 21, 13197, Berlin.
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <Divider className={classes.divider} />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" className={classes.label}>
                  {t('profile-page-details.about-label')}
                </Typography>
                <Typography variant="body1" className={classes.field}>
                  More than 10 years I help companies define, design and launch products with highly polished user
                  experiences and visual directions, across many industries.
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </form>

      <ActionOverlay
        config={profileUpdateFormoverlay}
        open={Boolean(overlay)}
        onClose={handleOverlayClose}
        onSuccess={handleDrawerFormSuccess}
      >
        <Grid
          component="form"
          container
          direction="column"
          justifyContent="space-between"
          alignItems="stretch"
          onSubmit={handleSubmit}
          height="100%"
        >
          <Grid item flexGrow={2}>
            <ProfileUpdateForm formik={formik} />
          </Grid>

          <Grid item flexShrink={1}>
            <ActionOverlayButtons
              cancelButton={
                <Button variant="outlined" size="large" type="button" onClick={handleOverlayClose}>
                  {t('cancel')}
                </Button>
              }
              onCancel={handleOverlayClose}
              displaySubmitButton={Boolean(formik)}
              submitDisabled={!formik?.dirty || formik?.isSubmitting}
              isSubmitting={formik?.isSubmitting}
            />
          </Grid>
        </Grid>
      </ActionOverlay>

      {status && <FormAlert open error={status.error} message={t('profile-update-success')} onClose={resetStatus} />}
    </>
  );
};
