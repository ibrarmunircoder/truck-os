import {
  CircularProgress,
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  MenuItemProps,
  Select,
  SelectProps,
} from '@mui/material';
import { useAsyncSelectStyles } from 'modules/forms/components/async-select/async-select.styles';
import { useAsyncSelect, UseAsyncSelectPropsInterface } from 'modules/forms/components/async-select/hooks';
import React, { useEffect, useMemo } from 'react';

interface IProps<T> extends SelectProps<string | number>, UseAsyncSelectPropsInterface<T> {
  label: string;
  variant?: 'outlined' | 'standard' | 'filled';
  limitIncrement?: number;
  // only required when using in edit mode.
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getOptionFilter?: (value: string | number) => any;
  helperText?: React.ReactNode;
  formControlProps?: Omit<FormControlProps, 'variant'>;
  menuItemsProps?: Omit<MenuItemProps, 'value'>;
}

export const AsyncSelect = <T extends unknown>(props: IProps<T>): React.ReactElement => {
  const {
    label,
    variant,
    limitIncrement,
    getOptionFilter,
    query,
    initialLimit,
    initialOffset,
    loadOnSelectOpen = false,
    extractOption,
    formControlProps,
    menuItemsProps,
    error,
    helperText,
    ...selectProps
  } = props;
  const classes = useAsyncSelectStyles();
  const { options, isLoading, hasMore, fetchOptions, fetchMore } = useAsyncSelect<T>({
    query,
    initialLimit,
    initialOffset,
    loadOnSelectOpen,
    extractOption,
  });

  const menuOptions = useMemo(
    () =>
      options.map((o, i) => (
        <MenuItem key={`${o.value}-${i}`} value={o.value} {...menuItemsProps}>
          {o.label}
        </MenuItem>
      )),
    [options],
  );

  /**
    There can be times when we have a value but corresponding option
    has not be loaded form the backend. This situation can arise when we
    are using the component in edit form. For this we have this added
    effect which checks if value exist and is not already in options
    then fetch more, but for this case, we need filter for that value.
  */
  useEffect(() => {
    const { value } = selectProps;
    if (value && getOptionFilter && options.length && !options.map((o) => o.value).includes(value)) {
      fetchOptions(getOptionFilter(value), 1, 0);
    }
  }, [selectProps.value, options.length]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSelectScroll = (e: any) => {
    if (Math.abs(e.target.scrollHeight - e.target.clientHeight - e.target.scrollTop) < 1 && hasMore) {
      fetchMore(limitIncrement);
    }
  };

  return (
    <FormControl fullWidth variant={variant} {...formControlProps} error={error}>
      <InputLabel id={`${label}-async-select-label`}>{label}</InputLabel>
      <Select
        {...selectProps}
        labelId={`${label}-async-select-label`}
        label={label}
        onOpen={loadOnSelectOpen ? fetchOptions : null}
        MenuProps={{
          classes: {
            paper: classes.dropDownPaper,
          },
          PaperProps: {
            onScroll: onSelectScroll,
          },
        }}
        error={error}
      >
        {menuOptions}
        {isLoading && (
          <div className={classes.loader}>
            <CircularProgress />
          </div>
        )}
      </Select>
      {error && helperText && <FormHelperText>{helperText}</FormHelperText>}
    </FormControl>
  );
};
