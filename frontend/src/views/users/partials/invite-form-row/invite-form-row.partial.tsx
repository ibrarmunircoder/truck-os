import DeleteIcon from '@mui/icons-material/DeleteForeverRounded';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import { FormikErrors } from 'formik';
import { USER_NAME_INPUT_PROPS } from 'modules/auth/constants';
import { UserInviteInterface } from 'modules/user-invites';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, FunctionComponent } from 'react';
import { useInviteFormRowStyles } from 'views/users/partials/invite-form-row/invite-form-row.styles';

export interface InviteFormRowInterface {
  index: number;
  invite: UserInviteInterface;
  onDelete: (index: number) => void;
  visibleErrors: FormikErrors<UserInviteInterface>;
  onBlur: (e: React.FocusEvent) => void;
  handleChange: (e: ChangeEvent) => void;
}

export const InviteFormRow: FunctionComponent<InviteFormRowInterface> = (props: InviteFormRowInterface) => {
  const { invite, visibleErrors, index, onBlur, onDelete, handleChange } = props;
  const classes = useInviteFormRowStyles(props);
  const { firstName = undefined, lastName = undefined, email = undefined } = invite || {};
  const { t } = useTranslation();

  return (
    <Grid container rowSpacing={1} columnSpacing={5} data-cy="invite-form-row-root">
      <Grid item sm={12} md={6}>
        <TextField
          name={`invites[${index}].firstName`}
          id={`invites[${index}].firstName]`}
          label={t('input.first-name.placeholder')}
          helperText={visibleErrors?.firstName}
          error={Boolean(visibleErrors?.firstName)}
          fullWidth
          inputProps={USER_NAME_INPUT_PROPS}
          onChange={handleChange}
          onBlur={onBlur}
          value={firstName}
          size="medium"
          variant="standard"
          InputLabelProps={{ shrink: !!firstName }}
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          id={`invites[${index}].lastName`}
          name={`invites[${index}].lastName`}
          value={lastName}
          size="medium"
          variant="standard"
          fullWidth
          inputProps={USER_NAME_INPUT_PROPS}
          label={t('input.last-name.placeholder')}
          helperText={visibleErrors?.lastName}
          error={Boolean(visibleErrors?.lastName)}
          onChange={handleChange}
          onBlur={onBlur}
          InputLabelProps={{ shrink: !!lastName }}
        />
      </Grid>

      <Grid item sm={12} md={6}>
        <TextField
          value={email}
          size="medium"
          variant="standard"
          fullWidth
          label={t('input.email.placeholder')}
          helperText={visibleErrors?.email}
          error={Boolean(visibleErrors?.email)}
          onChange={handleChange}
          onBlur={onBlur}
          id={`invites[${index}].email`}
          name={`invites[${index}].email`}
          InputLabelProps={{ shrink: !!email }}
        />
      </Grid>

      <Grid
        container
        item
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-end"
        xs="auto"
        visibility={index > 0 ? 'visible' : 'hidden'}
      >
        <IconButton
          data-cy={`invite-form-row-${index}-delete-btn`}
          disableFocusRipple={true}
          disableRipple={true}
          onClick={() => onDelete(index)}
          className={classes.trashIcon}
        >
          <DeleteIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};
