import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useSelectFieldStyles } from 'modules/common/components/select-field/select-field.styles';
import React, { FunctionComponent } from 'react';

interface ISelectFieldProps {
  id?: string;
  name?: string;
  label?: string;
  value?: string;
  error?: boolean;
  helperText?: string;
  fullWidth?: boolean;
  children: React.ReactNode;
  size?: 'small' | 'medium';
  variant: 'standard' | 'outlined' | 'filled';
  onChange: (event: SelectChangeEvent) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export const SelectField: FunctionComponent<ISelectFieldProps> = ({
  id,
  name,
  label,
  onChange,
  onBlur,
  value,
  children,
  error,
  helperText,
  variant,
  fullWidth,
  size = 'medium',
}): React.ReactElement => {
  const classes = useSelectFieldStyles();
  return (
    <FormControl className={classes.selectField} variant={variant} error={error} fullWidth={fullWidth} size={size}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select MenuProps={{
              classes: {
                paper: classes.paperBackground
              }
            }} 
            className={classes.formControl}
            labelId={id} id={id} name={name} value={value} label={label} onChange={onChange} onBlur={onBlur}>
        {children}
      </Select>
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
