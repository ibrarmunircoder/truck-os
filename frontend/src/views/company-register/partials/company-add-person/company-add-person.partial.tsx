/* eslint-disable @typescript-eslint/no-explicit-any */
import { Paper } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/system/Box';
import { FieldInputProps, FormikErrors, FormikTouched, getIn } from 'formik';
import { AutoCompleteField, InputField } from 'modules/common/components';
import { Button } from 'modules/common/components/button';
import { useCountries, useLanguages, useTranslation } from 'modules/common/hooks';
import DeleteIcon from 'modules/common/icons/delete-icon.svg';
import { IFieldNestedSchema } from 'modules/common/interfaces';
import { DateField } from 'modules/forms/components/date-field';
import React, { FunctionComponent } from 'react';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { useCompanyAddPersonStyles } from 'views/company-register/partials/company-add-person/company-add-person.styles';
import { buttonBaseStyles, disabledButtonStyles } from 'views/company-register/utils';

interface ICompanyAddPersonProps {
  title: string;
  type: AccountUserTypeEnum;
  btnText: string;
  arrayField: IFieldNestedSchema;
  index: number;
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  getFieldProps: <Value = any>(props: any) => FieldInputProps<Value>;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  visibleErrors: FormikErrors<unknown>;
  touched: FormikTouched<unknown>;
  handleDeleteClick: () => void;
}

export const CompanyAddPerson: FunctionComponent<ICompanyAddPersonProps> = ({
  title,
  type,
  btnText,
  arrayField,
  index,
  onClick,
  getFieldProps,
  setFieldValue,
  handleBlur,
  visibleErrors,
  touched,
  handleDeleteClick,
}): React.ReactElement => {
  const classes = useCompanyAddPersonStyles();
  const languages = useLanguages();
  const { t } = useTranslation();
  const countries = useCountries();
  const CustomPaper = (paperProps) => <Paper elevation={4} {...paperProps} />;
  const { value: defaultValue } = getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[4].name}`);
  const { value: defaultValueNationality } = getFieldProps(
    `${arrayField.name}.${index}.${arrayField.nestedFields[6]?.name ?? ''}`,
  );
  const { value: defaultCountry } = getFieldProps(
    `${arrayField.name}.${index}.${arrayField.nestedFields[10]?.name ?? ''}`,
  );
  const isError = (fieldIndex: number) =>
    getIn(touched, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`) &&
    Boolean(getIn(visibleErrors, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`));

  const isErrorMessage = (fieldIndex: number) =>
    getIn(visibleErrors, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`);

  const isDisabled = (fieldIndex: number) =>
    Boolean(getIn(visibleErrors, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`));

  const birthPlaceElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <InputField
        type="text"
        fullWidth
        id={`${arrayField.name}.${index}.${arrayField.nestedFields[5].name}`}
        label={t('company-register.account-user.birthplace')}
        variant="outlined"
        helperText={isErrorMessage(5)}
        error={isError(5)}
        {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[5].name}`)}
        size="small"
      />
    ) : null;

  const nationalityElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <AutoCompleteField
        defaultValue={countries.find((countryObj) => countryObj.code === defaultValueNationality) || null}
        value={countries.find((countryObj) => countryObj.code === defaultValueNationality) || null}
        options={countries}
        onChange={(_, value: any) =>
          setFieldValue(`${arrayField.name}.${index}.${arrayField.nestedFields[6].name}`, value.code)
        }
        getOptionLabel={(option) => option.label || ''}
        PaperComponent={CustomPaper}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt="Country Flag"
            />
            {option.label} ({option.code})
          </Box>
        )}
        textFieldProps={{
          id: `${arrayField.name}.${index}.${arrayField.nestedFields[6].name}`,
          label: t('company-register.account-user.nationality'),
          name: `${arrayField.name}.${index}.${arrayField.nestedFields[6].name}`,
          variant: 'outlined',
          helperText: isError(6) && isErrorMessage(6),
          error: isError(6),
          fullWidth: true,
          onBlur: handleBlur,
        }}
      />
    ) : null;

  const streeAndNumberElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <InputField
        type="text"
        fullWidth
        id={`${arrayField.name}.${index}.${arrayField.nestedFields[7].name}`}
        label={t('company-register.account-user.street')}
        variant="outlined"
        helperText={isErrorMessage(7)}
        error={isError(7)}
        {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[7].name}`)}
        size="small"
      />
    ) : null;

  const houseNumberElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <InputField
        type="number"
        fullWidth
        id={`${arrayField.name}.${index}.${arrayField.nestedFields[11].name}`}
        label={t('company-register.account-user.house-number')}
        variant="outlined"
        helperText={isErrorMessage(11)}
        error={isError(11)}
        {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[11].name}`)}
        size="small"
      />
    ) : null;

  const postalCodeElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <InputField
        type="text"
        fullWidth
        id={`${arrayField.name}.${index}.${arrayField.nestedFields[8].name}`}
        label={t('company-register.account-user.postcode')}
        variant="outlined"
        helperText={isErrorMessage(8)}
        error={isError(8)}
        {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[8].name}`)}
        size="small"
      />
    ) : null;
  const cityElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <InputField
        type="text"
        fullWidth
        id={`${arrayField.name}.${index}.${arrayField.nestedFields[9].name}`}
        label={t('company-register.account-user.city')}
        variant="outlined"
        helperText={isErrorMessage(9)}
        error={isError(9)}
        {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[9].name}`)}
        size="small"
      />
    ) : null;
  const countryElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <AutoCompleteField
        defaultValue={countries.find((countryObj) => countryObj.label === defaultCountry) || null}
        value={countries.find((countryObj) => countryObj.label === defaultCountry) || null}
        options={countries}
        onChange={(_, value: any) =>
          setFieldValue(`${arrayField.name}.${index}.${arrayField.nestedFields[10].name}`, value.label)
        }
        getOptionLabel={(option) => option.label || ''}
        PaperComponent={CustomPaper}
        renderOption={(props, option) => (
          <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
            <img
              loading="lazy"
              width="20"
              src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
              srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
              alt="Country Flag"
            />
            {option.label} ({option.code})
          </Box>
        )}
        textFieldProps={{
          id: `${arrayField.name}.${index}.${arrayField.nestedFields[10].name}`,
          label: t('company-register.account-user.country'),
          name: `${arrayField.name}.${index}.${arrayField.nestedFields[10].name}`,
          variant: 'outlined',
          helperText: isError(10) && isErrorMessage(10),
          error: isError(10),
          fullWidth: true,
          onBlur: handleBlur,
        }}
      />
    ) : null;

  const languageElement =
    type === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE ? (
      <AutoCompleteField
        defaultValue={languages.find((language) => language.code === defaultValue) || null}
        value={languages.find((language) => language.code === defaultValue) || null}
        options={languages}
        getOptionLabel={(option) => option.name || ''}
        PaperComponent={CustomPaper}
        onChange={(_, value: any) =>
          setFieldValue(`${arrayField.name}.${index}.${arrayField.nestedFields[4].name}`, value.code)
        }
        textFieldProps={{
          id: `${arrayField.name}.${index}.${arrayField.nestedFields[4].name}`,
          label: t('company-register.account-user.language'),
          name: `${arrayField.name}.${index}.${arrayField.nestedFields[4].name}`,
          variant: 'outlined',
          helperText: isError(4) && isErrorMessage(4),
          error: isError(4),
          fullWidth: true,
          onBlur: handleBlur,
        }}
      />
    ) : null;
  return (
    <article className={classes.companyAddPerson}>
      <Box className={classes.companyAddPersonHeader}>
        <Typography component="h2" className={classes.companyAddPersonTitle}>
          {title}
        </Typography>
        <div className={classes.cardHeaderIcons} onClick={handleDeleteClick}>
          <DeleteIcon />
        </div>
      </Box>
      <Box>
        <InputField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[0].name}`}
          label={t('company-register.account-user.first-name')}
          variant="outlined"
          helperText={isErrorMessage(0)}
          error={isError(0)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[0].name}`)}
          size="small"
        />

        <InputField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[1].name}`}
          label={t('company-register.account-user.last-name')}
          variant="outlined"
          helperText={isErrorMessage(1)}
          error={isError(1)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[1].name}`)}
          size="small"
        />
        <InputField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[2].name}`}
          label={t('company-register.account-user.email')}
          variant="outlined"
          helperText={isErrorMessage(2)}
          error={isError(2)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[2].name}`)}
          size="small"
        />
        <DateField
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[3].name}`)}
          maxDate={new Date()}
          onChange={(date) => {
            if (date instanceof Date && new Date(date).toString() !== 'Invalid Date') {
              setFieldValue(
                `${arrayField.name}.${index}.${arrayField.nestedFields[3].name}`,
                new Date(date).toUTCString(),
              );
            } else {
              setFieldValue(`${arrayField.name}.${index}.${arrayField.nestedFields[3].name}`, '');
            }
          }}
          textFieldProps={{
            label: t('company-register.account-user.birthday'),
            variant: 'outlined',
            helperText: isErrorMessage(3),
            error: isErrorMessage(3) ? true : false,
            name: `${arrayField.name}.${index}.${arrayField.nestedFields[3].name}`,
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
        {languageElement}
        {birthPlaceElement}
        {nationalityElement}
        {streeAndNumberElement}
        {houseNumberElement}
        {postalCodeElement}
        {countryElement}
        {cityElement}

        <Button
          disabled={isDisabled(0) || isDisabled(1) || isDisabled(2) || isDisabled(3) || isError(4)}
          style={
            isDisabled(0) || isDisabled(1) || isDisabled(2) || isDisabled(3) || isDisabled(4)
              ? disabledButtonStyles
              : buttonBaseStyles
          }
          type="button"
          variant="contained"
          fullWidth
          text={btnText}
          onClick={onClick}
        />
      </Box>
    </article>
  );
};
