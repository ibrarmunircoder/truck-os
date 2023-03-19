/* eslint-disable @typescript-eslint/no-explicit-any */
import { Autocomplete, AutocompleteRenderOptionState, PaperProps, PopperProps, TextField, TextFieldProps } from '@mui/material';
import { useAutoCompleteFieldStyles } from 'modules/common/components/auto-complete-field/auto-complete-field.styles';
import React, { FunctionComponent } from 'react';

interface AutoCompleteFieldProps {
  options: any;
  defaultValue?: string | number | any;
  inputValue?: string | number | any;
  value?: string | number | any;
  renderInput?: (props: TextFieldProps) => React.ReactElement;
  // renderInput?: (props: TextFieldProps) => React.ReactElement<HTMLDivElement, string | React.JSXElementConstructor<any>>;
  textFieldProps?: TextFieldProps;
  getOptionLabel?: (option: any) => string;
  PopperComponent?: React.JSXElementConstructor<PopperProps>;
  PaperComponent?: React.JSXElementConstructor<PaperProps>;
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
    state: AutocompleteRenderOptionState,
  ) => React.ReactNode;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>, value: string) => void;
}

export const AutoCompleteField: FunctionComponent<AutoCompleteFieldProps> = (props) => {
  const {
    defaultValue,
    value,
    options,
    onChange,
    textFieldProps,
    PopperComponent,
    PaperComponent,
    getOptionLabel,
    renderOption,
    disabled,
    inputValue,
    ...restProps
  } = props;
  const classes = useAutoCompleteFieldStyles();
  return (
    <Autocomplete
      disabled={disabled}
      defaultValue={defaultValue}
      inputValue={inputValue}
      value={value}
      getOptionLabel={getOptionLabel}
      options={options}
      onChange={onChange}
      disablePortal={true}
      PopperComponent={PopperComponent}
      PaperComponent={PaperComponent}
      renderOption={renderOption}
      classes={{ paper: classes.paperBackground }}
      {...restProps}
      renderInput={(params) => <TextField {...params} {...textFieldProps} className={classes.formControl} />}
    />
  );
};
