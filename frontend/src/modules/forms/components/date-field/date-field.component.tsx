import { TextField, TextFieldProps } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker, DatePickerProps } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateFnsLocaleContext } from 'modules/date-time/contexts';
import { useDateFieldStyles } from 'modules/forms/components/date-field/date-field.styles';
import React, { useContext } from 'react';

interface IProps extends Omit<DatePickerProps<Date>, 'renderInput'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  renderInput?: (props: TextFieldProps) => React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  textFieldProps?: TextFieldProps;
}

const maskMap = {
  'en-US': '__/__/____',
  de: '__.__.____',
};

const placeholderLocalMap = {
  'en-US': 'MM/DD/YYYY',
  de: 'DD.MM.YYYY',
};

export const DateField: React.FC<IProps> = ({ textFieldProps, ...props }) => {
  const locale = useContext(DateFnsLocaleContext);
  const classes = useDateFieldStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
      <DatePicker
        DialogProps={{ className: classes.dialogDatePicker }}
        PaperProps={{ className: classes.paperDialog }}
        mask={maskMap[locale?.code]}
        renderInput={(params) => (
          <TextField
            {...params}
            {...textFieldProps}
            className={classes.formControl}
            inputProps={{
              ...params.inputProps,
              placeholder: placeholderLocalMap[locale?.code],
            }}
          />
        )}
        {...props}
      />
    </LocalizationProvider>
  );
};
