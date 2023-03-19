import { TextField } from '@mui/material';
import { useInputFieldStyles } from 'modules/common/components/input-field/input-field.styles';
import React, { FunctionComponent } from 'react';

interface InputFieldProps {
  id?: string;
  size?: 'small' | 'medium';
  name?: string;
  type: string;
  label: string;
  value: string | number;
  helperText: string;
  placeholder?: string;
  error: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  variant?: 'outlined' | 'standard' | 'filled';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onReset?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export const InputField: FunctionComponent<InputFieldProps> = ({
  id,
  name,
  type,
  value,
  label,
  onChange,
  onReset,
  onBlur,
  error,
  variant,
  helperText,
  placeholder,
  fullWidth,
  disabled,
  size = 'medium',
}) => {
  const classes = useInputFieldStyles();
  return (
    <TextField
      name={name}
      type={type}
      label={label}
      placeholder={placeholder}
      value={value}
      helperText={error && helperText}
      error={error}
      className={classes.formControl}
      fullWidth={fullWidth}
      onChange={onChange}
      onReset={onReset}
      onBlur={onBlur}
      variant={variant}
      id={id}
      size={size}
      disabled={disabled}
    />
  );
};
