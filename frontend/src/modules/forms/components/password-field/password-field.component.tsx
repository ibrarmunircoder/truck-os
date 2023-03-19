import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField, { TextFieldProps } from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import { useTranslation } from 'modules/common/hooks';
import { forwardRef, useCallback, useEffect, useState } from 'react';

export type PasswordFieldProps = TextFieldProps

export const PasswordField = forwardRef<HTMLInputElement, PasswordFieldProps>((props, ref) => {
  const {
    InputProps,
    disabled,
    value,
    ...other
  } = props;

  const { t } = useTranslation();

  const [type, setType] = useState<'password' | 'text'>('password');
  const togglePasswordVisibility = useCallback(() => {
    setType(type === 'password' ? 'text' : 'password');
  }, [type]);

  useEffect(() => {
    if (disabled) {
      setType('password')
    }
  }, [disabled])

  const inputProps = value ? {
    endAdornment: (
      <InputAdornment position="end">
        <Tooltip title={type === 'password' ? t('password_unmask') : t('password_mask')}>
          <IconButton
            disabled={disabled}
            aria-label={type === 'password' ? t('password_unmask') : t('password_mask')}
            onClick={!disabled ? togglePasswordVisibility : undefined}
            onMouseDown={!disabled ? togglePasswordVisibility : undefined}
          >
            {type === 'password' ? <Visibility /> : <VisibilityOff />}
          </IconButton>
        </Tooltip>
      </InputAdornment>
    ),
    ...InputProps
  } : { ...InputProps };

  return (
    <TextField
      ref={ref}
      InputProps={inputProps}
      {...other}
      type={type}
      disabled={disabled}
    />
  );
});

PasswordField.displayName = 'PasswordField'
