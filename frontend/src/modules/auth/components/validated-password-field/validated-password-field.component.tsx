import { Tooltip } from '@mui/material';
import { PasswordValidationErrors } from 'modules/auth/components';
import { useValidatedPasswordFieldStyles } from 'modules/auth/components/validated-password-field/validated-password-field.styles';
import { PASSWORD_MAX_LENGTH } from 'modules/auth/hooks/use-password-validation.hook';
import { PasswordField } from 'modules/forms/components';
import { PasswordFieldProps } from 'modules/forms/components/password-field/password-field.component';
import React, { ReactElement, useMemo } from 'react';
import { useMeasure } from 'react-use';
import { BaseSchema } from 'yup';

type PasswordChangeFormPartialProps = PasswordFieldProps & {
  label: string;
  validationErrorsTitle?: string;
  schema?: BaseSchema;
  rules?: string[];
};

const baseInputProps = { maxLength: PASSWORD_MAX_LENGTH };

export const ValidatedPasswordField = ({
  validationErrorsTitle,
  schema,
  rules,
  inputProps,
  helperText,
  ...props
}: PasswordChangeFormPartialProps): ReactElement => {
  const [ref, { width }] = useMeasure();
  const classes = useValidatedPasswordFieldStyles(width);
  const thisInputProps = useMemo(() => ({ ...baseInputProps, ...inputProps }), [inputProps]);

  return (
    <Tooltip
      disableHoverListener
      classes={classes.tooltip}
      title={
        <PasswordValidationErrors
          title={validationErrorsTitle}
          label={props.label}
          value={props.value as string}
          schema={schema}
          rules={rules}
        />
      }
    >
      {/* 
        display only "required" error message as other password validation erorrs are already being handled
        by PasswordValidationErrors component
      */}
      <PasswordField
        {...props}
        helperText={helperText?.toString()?.includes('required') ? helperText : null}
        ref={ref}
        inputProps={thisInputProps}
      />
    </Tooltip>
  );
};
