import { Checkbox, CheckboxProps, FormControl, FormControlLabel, FormLabel } from '@mui/material';
import { useCheckboxFieldStyles } from 'modules/forms/components/checkbox-field/checkbox-field.styles';
import * as React from 'react';

interface IProps extends CheckboxProps {
  fieldLabel: string;
  checkboxLabel: string;
}

export const CheckboxField: React.FC<IProps> = (props) => {
  const { fieldLabel, checkboxLabel, ...checkboxProps } = props;
  const classes = useCheckboxFieldStyles();
  return (
    <FormControl fullWidth className={classes.formControl}>
      <FormLabel>{fieldLabel}</FormLabel>
      <FormControlLabel control={<Checkbox {...checkboxProps} />} label={checkboxLabel} />
    </FormControl>
  );
};
