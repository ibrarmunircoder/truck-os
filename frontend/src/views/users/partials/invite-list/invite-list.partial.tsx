import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { FormikErrors } from 'formik';
import { UseEnhancedFormikInterface } from 'modules/forms/hooks';
import { UserInviteInterface } from 'modules/user-invites';
import { useTranslation } from 'next-i18next';
import React, { FunctionComponent, ReactNode, useMemo } from 'react';
import { useAddNewFormRow } from 'views/users/hooks';
import { InviteFormPartial } from 'views/users/partials/invite-form/invite-form.partial';

export interface UserInviteFormValueInterface {
  invites: UserInviteInterface[];
}

export interface InviteListPartialInterface {
  children?: ReactNode;
  formik: UseEnhancedFormikInterface<UserInviteFormValueInterface>;
}

export const InviteListPartial: FunctionComponent<InviteListPartialInterface> = (props) => {
  const { formik } = props;
  const { isSubmitting, values, handleChange, setFieldValue, handleSubmit, visibleErrors, handleBlur, isValid } =
    formik;
  const { t } = useTranslation();

  const { onAddRow, maxRowLimit } = useAddNewFormRow({
    value: values,
    onChange: setFieldValue,
    initialValue: { firstName: undefined, lastName: undefined, email: undefined },
  });

  const disableAddButton = useMemo(() => values?.invites?.length === maxRowLimit, [values, maxRowLimit]);

  return (
    <Grid container>
      <Grid item>
        <InviteFormPartial
          isSubmitting={isSubmitting}
          handleChange={handleChange}
          onChange={setFieldValue}
          onSubmit={handleSubmit}
          errors={visibleErrors?.invites as FormikErrors<UserInviteInterface>[]}
          invites={values?.invites}
          onBlur={handleBlur}
          disableSendInvite={!isValid || isSubmitting}
        />
      </Grid>

      <Grid item marginTop={4}>
        <Button
          data-cy="invite-list-partial-invite-more-btn"
          component="span"
          variant="outlined"
          size="medium"
          disabled={disableAddButton}
          onClick={onAddRow}
        >
          {t('add-another-user')}
        </Button>
      </Grid>
    </Grid>
  );
};
