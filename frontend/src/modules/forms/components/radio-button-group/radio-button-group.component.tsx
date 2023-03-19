import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { useRadioButtonGroupStyles } from 'modules/forms/components/radio-button-group/radio-button-group.styles';
import { RadiosData } from 'modules/forms/interfaces';
import React from 'react';

interface IProps extends RadioGroupProps {
  label: string;
  radiosData: RadiosData[];
}

export const RadioButtonGroup: React.FC<IProps> = (props) => {
  const { label, radiosData, ...radioGroupProps } = props;
  const classes = useRadioButtonGroupStyles();
  return (
    <FormControl fullWidth className={classes.formControl}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup {...radioGroupProps}>
        {radiosData.map((rd, i) => (
          <FormControlLabel
            key={`${rd.label}-${i}`}
            value={rd.value}
            control={<Radio {...rd.radioProps} />}
            label={rd.label}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};
