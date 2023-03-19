/* eslint-disable @typescript-eslint/no-empty-function */
import { ButtonProps } from '@mui/material';
import MUIButton from '@mui/material/Button';
import { useButtonStyles } from 'modules/common/components/button/button.styles';
import React, { FunctionComponent } from 'react';

interface IButtonProps extends ButtonProps {
  variant: 'contained' | 'outlined' | 'text';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  text?: string;
  type: 'button' | 'submit' | 'reset';
  children?: React.ReactNode;
  disabled?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Button: FunctionComponent<IButtonProps> = ({
  fullWidth = false,
  variant = 'contained',
  size = 'medium',
  children,
  text,
  type,
  disabled = false,
  icon,
  iconPosition,
  onClick = () => {},
  ...rest
}): React.ReactElement => {
  const classes = useButtonStyles();
  const btnText = text || children;
  const className =
    variant === 'contained'
      ? classes.buttonContainedPrimary
      : variant === 'outlined'
      ? classes.buttonOutlinedPrimary
      : '';
  let iconProps = {};
  if (icon) {
    if (iconPosition === 'left') iconProps = { startIcon: icon };
    if (iconPosition === 'right') iconProps = { endIcon: icon };
  }
  return (
    <MUIButton
      className={className}
      type={type}
      variant={variant}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled}
      onClick={onClick}
      {...iconProps}
      {...rest}
    >
      {btnText}
    </MUIButton>
  );
};
