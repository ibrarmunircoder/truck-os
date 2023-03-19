import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, Grid, IconButton, MenuItem, Paper, TextField, Typography } from '@mui/material';
import { ActionOverlay } from 'modules/action-overlay/components/action-overlay';
import { ActionOverlayButtons } from 'modules/action-overlay/components/action-overlay-buttons';
import { SelectField } from 'modules/common/components';
import { RoqLink } from 'modules/common/components/roq-link';
import { useRouter, useTranslation } from 'modules/common/hooks';
import { FormAlert } from 'modules/forms/components';
import { useEnhancedFormik } from 'modules/forms/hooks';
import { UserTableToggleButtonGroup } from 'modules/users/components';
import { UserTableToggleButtonGroupEnum } from 'modules/users/components/user-table-toggle-button-group/user-table-toggle-button-group.component';
import { Trans } from 'next-i18next';
import React, { FunctionComponent, useCallback, useEffect, useMemo, useState } from 'react';
import { useInvitesFormSchema, useSendInvitesForm, useUserSearch } from 'views/users/hooks';
import { InviteListPartial } from 'views/users/partials';
import { UserInviteFormValueInterface } from 'views/users/partials/invite-list/invite-list.partial';
import { useUsersTableStyles } from 'views/users/partials/users-table/users-table.styles';
import { UserInvitesTable, UsersTable } from 'views/users/tables';

interface UsersTablePartialInterface {
  onFilterChange?: (newUserFilter: string | null) => void;
  userFilter: UserTableToggleButtonGroupEnum;
}

export const UsersTablePartial: FunctionComponent<UsersTablePartialInterface> = (props) => {
  const classes = useUsersTableStyles();
  const { t } = useTranslation();
  const router = useRouter();
  const [overlay, setOverlay] = useState(null);
  const [userFilter, setUserFilter] = React.useState<UserTableToggleButtonGroupEnum | null>(null);
  const { handleSearchOnChange, searchByOptions, handleSearchByOnChange, userSearchBy } = useUserSearch();

  useEffect(() => setUserFilter(props.userFilter), [props.userFilter]);

  const onChangeUserFilter = (_, newUserFilter: UserTableToggleButtonGroupEnum | null) => {
    setUserFilter(newUserFilter);
    props.onFilterChange(newUserFilter);
  };

  const initialValues: UserInviteFormValueInterface = useMemo(
    () => ({
      invites: [{ firstName: undefined, lastName: undefined, email: undefined }],
    }),
    [],
  );

  const { handleSendInvite: onSubmit, errorCount, successCount, resetResponseCount } = useSendInvitesForm();
  const formik = useEnhancedFormik<UserInviteFormValueInterface>({
    initialValues,
    onSubmit,
    validationSchema: useInvitesFormSchema(),
  });

  const profileUpdateFormoverlay = {
    title: t('invite-new-user'),
    subTitle: t('invite-new-user-subtitle'),
  };

  const handleOverlayClose = useCallback(() => {
    setOverlay(null);
    formik.resetForm();
  }, [formik]);

  const handleDrawerFormSuccess = () => handleOverlayClose();

  const resetCount = () => {
    formik.resetStatus();
    resetResponseCount();
  };

  const handleClickedSuccessLink = () => {
    if (router.route === UserTableToggleButtonGroupEnum.INVITED) {
      router.reload();
    }

    void router.push({
      route: UserTableToggleButtonGroupEnum.INVITED,
    });
  };

  /*
    t('invite-was-sent-successfully_plural');
    t('invite-was-sent-successfully');
  */

  const inviteWasSentGlossary =
    successCount > 1 ? 'invite-was-sent-successfully_plural' : 'invite-was-sent-successfully';

  const renderTable = (selectedUserFilter) =>
    [UserTableToggleButtonGroupEnum.INVITED, UserTableToggleButtonGroupEnum.CANCELED].includes(selectedUserFilter) ? (
      <UserInvitesTable userFilter={selectedUserFilter} />
    ) : (
      <UsersTable userFilter={selectedUserFilter} />
    );

  return (
    <>
      <Paper classes={classes.paper}>
        <Grid container justifyContent="space-between" alignItems="center" className={classes.topSection}>
          <Typography variant="h6" color="primary" className={classes.topSectionTitle}>
            {t('users')}
          </Typography>

          <Box>
            <TextField
              className={classes.searchInput}
              type="text"
              placeholder="Search"
              variant="standard"
              onChange={handleSearchOnChange()}
              InputProps={{
                endAdornment: (
                  <IconButton sx={{ padding: 0 }}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
            <SelectField label="Search By" value={userSearchBy} variant="outlined" onChange={handleSearchByOnChange}>
              {searchByOptions.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </SelectField>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
            <UserTableToggleButtonGroup userFilter={userFilter} onChange={onChangeUserFilter} />

            <Button
              data-cy="user-table-partial-invite-btn"
              onClick={() => setOverlay('open')}
              variant="contained"
              startIcon={<AddIcon />}
            >
              {t('invite-user')}
            </Button>
          </Box>
        </Grid>

        {renderTable(userFilter)}
      </Paper>

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
          onSubmit={formik.handleSubmit}
          height="100%"
          data-cy="user-table-partial-invite-form"
        >
          <Grid item flexGrow={2}>
            <InviteListPartial formik={formik} />
          </Grid>

          <Grid item flexShrink={1}>
            <ActionOverlayButtons
              submitButton={
                <Button
                  color="primary"
                  variant="contained"
                  size="large"
                  type="submit"
                  disabled={!formik?.dirty || formik?.isSubmitting}
                  data-cy="user-table-partial-invite-form-submit-btn"
                >
                  {t('invite')}
                </Button>
              }
              cancelButton={
                <Button variant="outlined" size="large" type="button" onClick={handleOverlayClose} color="error">
                  {t('cancel')}
                </Button>
              }
              onCancel={handleOverlayClose}
              displaySubmitButton={true}
              isSubmitting={formik?.isSubmitting}
            />
          </Grid>
        </Grid>
      </ActionOverlay>

      <FormAlert
        data-cy="user-table-partial-invite-form-alert"
        open={!!successCount || !!formik.status?.error || !!errorCount}
        partialSuccess={true}
        message={
          successCount > 0 ? (
            <Trans
              i18nKey={inviteWasSentGlossary}
              values={{ count: successCount }}
              components={[
                null,
                <RoqLink key={1} onClick={handleClickedSuccessLink} className={classes.successLink} />,
              ]}
            />
          ) : undefined
        }
        error={errorCount > 0 ? new Error(t('invite-failed', { count: errorCount })) : formik.status?.error}
        onClose={resetCount}
      />
    </>
  );
};
