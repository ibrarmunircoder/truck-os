import { Grid } from '@mui/material';
import { FormikErrors } from 'formik';
import { UserInviteInterface } from 'modules/user-invites';
import { ChangeEvent, FunctionComponent, useCallback } from 'react';
import { InviteFormRow } from 'views/users/partials/invite-form-row/invite-form-row.partial';

export interface InviteFormInterface {
  invites: UserInviteInterface[];
  errors: FormikErrors<UserInviteInterface>[];
  onBlur: (e: React.FocusEvent) => void;
  onChange: (field: string, value: unknown, shouldValidate?: boolean) => void;
  onSubmit: () => void;
  disableSendInvite: boolean;
  handleChange: (e: ChangeEvent) => void;
  isSubmitting: boolean;
}

export const InviteFormPartial: FunctionComponent<InviteFormInterface> = (props: InviteFormInterface) => {
  const { invites, errors, onBlur, onChange, handleChange } = props;

  const onDelete = useCallback(
    (index) =>
      onChange(
        'invites',
        invites.filter((_, currIndex) => currIndex !== index),
      ),
    [invites],
  );
  return (
    <Grid container rowSpacing={1} columnSpacing={5}>
      <Grid item xs={12}>
        {invites.map((invite, index) => (
          <InviteFormRow
            handleChange={handleChange}
            key={`invite-form-${index}`}
            index={index}
            visibleErrors={errors?.[index] as unknown as FormikErrors<UserInviteInterface>}
            onBlur={onBlur}
            invite={invite}
            onDelete={onDelete}
          />
        ))}
      </Grid>
    </Grid>
  );
};
