/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Popper from '@mui/material/Popper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { FieldInputProps, FormikErrors, FormikTouched, getIn } from 'formik';
import { AutoCompleteField } from 'modules/common/components';
import { useCountries, useLanguages, useTranslation } from 'modules/common/hooks';
import DeleteIcon from 'modules/common/icons/delete-icon.svg';
import { IFieldNestedSchema } from 'modules/common/interfaces';
import { DateField } from 'modules/forms/components/date-field';
import React, { FunctionComponent } from 'react';
import {
  OWNER_BIRTH_PLACE_FIELD,
  OWNER_CITY_FIELD,
  OWNER_COUNTRY_FIELD,
  OWNER_HOUSE_NUMBER_FIELD,
  OWNER_NATIONALITY_FIELD,
  OWNER_POSTAL_CODE_FIELD,
  OWNER_STREET_AND_NUMBER_FIELD,
  REPRESENTATIVE__OWNER_EMAIL_FIELD,
  REPRESENTATIVE_LANGUAGE_FIELD,
  REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD,
  REPRESENTATIVE_OWNER_FIRST_NAME_FIELD,
  REPRESENTATIVE_OWNER_LAST_NAME_FIELD,
} from 'views/company-register/constants';
import { AccountUserTypeEnum } from 'views/company-register/enum';
import { EditUserFormValuesInterface } from 'views/users/hooks/use-edit-user-form.hook';
import { useUserAccountUserEditFormStyles } from 'views/users/partials/user-account-user-edit-form/user-account-user-edit-form.styles';
interface UserAccountUserEditFormProps {
  getFieldProps: (nameOrOptions: any) => FieldInputProps<any>;
  setFieldValue: (
    field: string,
    value: any,
    shouldValidate?: boolean,
  ) => Promise<void> | Promise<FormikErrors<EditUserFormValuesInterface>>;
  touched: FormikTouched<EditUserFormValuesInterface>;
  visibleErrors: FormikErrors<EditUserFormValuesInterface>;
  handleBlur: (e: React.FocusEvent<any, Element>) => void;
  arrayField: IFieldNestedSchema;
  index: number;
  type: AccountUserTypeEnum;
  title: string;
  handleDeleteAccountUser: () => void;
}

export const UserAccountUserEditForm: FunctionComponent<UserAccountUserEditFormProps> = ({
  title,
  getFieldProps,
  touched,
  visibleErrors,
  handleBlur,
  arrayField,
  setFieldValue,
  index,
  type,
  handleDeleteAccountUser,
}) => {
  const languages = useLanguages();
  const { t } = useTranslation();
  const countries = useCountries();
  const { value: defaultValue } = getFieldProps(
    `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_LANGUAGE_FIELD].name}`,
  );
  const { value: defaultValueNationality } = getFieldProps(
    `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_NATIONALITY_FIELD]?.name ?? ''}`,
  );
  const { value: defaultCountry } = getFieldProps(
    `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_COUNTRY_FIELD]?.name ?? ''}`,
  );
  const classes = useUserAccountUserEditFormStyles();
  const isError = (fieldIndex: number) =>
    getIn(touched, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`) &&
    Boolean(getIn(visibleErrors, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`));

  const isErrorMessage = (fieldIndex: number) =>
    getIn(visibleErrors, `${arrayField.name}.${index}.${arrayField.nestedFields[fieldIndex].name}`);

  const birthPlaceElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_BIRTH_PLACE_FIELD].name}`}
          label={t('company-register.account-user.birthplace')}
          variant="standard"
          helperText={isError(OWNER_BIRTH_PLACE_FIELD) && isErrorMessage(OWNER_BIRTH_PLACE_FIELD)}
          error={isError(OWNER_BIRTH_PLACE_FIELD)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_BIRTH_PLACE_FIELD].name}`)}
          size="small"
        />
      </Grid>
    ) : null;

  const nationalityElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <AutoCompleteField
          defaultValue={countries.find((countryObj) => countryObj.code === defaultValueNationality) || null}
          value={countries.find((countryObj) => countryObj.code === defaultValueNationality) || null}
          options={countries}
          onChange={(_, value: any) =>
            setFieldValue(
              `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_NATIONALITY_FIELD].name}`,
              value.code,
            )
          }
          getOptionLabel={(option) => option.label || ''}
          PopperComponent={(props) => (
            <Popper open={true} {...props} style={{ bottom: 0, overflowY: 'auto' }} placement="bottom">
              {props.children}
            </Popper>
          )}
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
            id: `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_NATIONALITY_FIELD].name}`,
            label: t('company-register.account-user.nationality'),
            name: `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_NATIONALITY_FIELD].name}`,
            variant: 'standard',
            helperText: isError(OWNER_NATIONALITY_FIELD) && isErrorMessage(OWNER_NATIONALITY_FIELD),
            error: isError(OWNER_NATIONALITY_FIELD),
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
      </Grid>
    ) : null;

  const streeAndNumberElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_STREET_AND_NUMBER_FIELD].name}`}
          label={t('company-register.account-user.street')}
          variant="standard"
          helperText={isError(OWNER_STREET_AND_NUMBER_FIELD) && isErrorMessage(OWNER_STREET_AND_NUMBER_FIELD)}
          error={isError(OWNER_STREET_AND_NUMBER_FIELD)}
          {...getFieldProps(
            `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_STREET_AND_NUMBER_FIELD].name}`,
          )}
          size="small"
        />
      </Grid>
    ) : null;

  const houseNumberElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <TextField
          type="number"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_HOUSE_NUMBER_FIELD].name}`}
          label={t('company-register.account-user.house-number')}
          variant="standard"
          helperText={isError(OWNER_HOUSE_NUMBER_FIELD) && isErrorMessage(OWNER_HOUSE_NUMBER_FIELD)}
          error={isError(OWNER_HOUSE_NUMBER_FIELD)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_HOUSE_NUMBER_FIELD].name}`)}
          size="small"
        />
      </Grid>
    ) : null;

  const postalCodeElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_POSTAL_CODE_FIELD].name}`}
          label={t('company-register.account-user.postcode')}
          variant="standard"
          helperText={isError(OWNER_POSTAL_CODE_FIELD) && isErrorMessage(OWNER_POSTAL_CODE_FIELD)}
          error={isError(OWNER_POSTAL_CODE_FIELD)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_POSTAL_CODE_FIELD].name}`)}
          size="small"
        />
      </Grid>
    ) : null;
  const cityElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_CITY_FIELD].name}`}
          label={t('company-register.account-user.city')}
          variant="standard"
          helperText={isError(OWNER_CITY_FIELD) && isErrorMessage(OWNER_CITY_FIELD)}
          error={isError(OWNER_CITY_FIELD)}
          {...getFieldProps(`${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_CITY_FIELD].name}`)}
          size="small"
        />
      </Grid>
    ) : null;
  const countryElement =
    type === AccountUserTypeEnum.ACCOUNT_BENEFICIAL_OWNER ? (
      <Grid item xs={12} md={6}>
        <AutoCompleteField
          defaultValue={countries.find((countryObj) => countryObj.label === defaultCountry) || null}
          value={countries.find((countryObj) => countryObj.label === defaultCountry) || null}
          options={countries}
          onChange={(_, value: any) =>
            setFieldValue(
              `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_COUNTRY_FIELD].name}`,
              value.label,
            )
          }
          getOptionLabel={(option) => option.label || ''}
          PopperComponent={(props) => (
            <Popper open={true} {...props} style={{ bottom: 0, overflowY: 'auto' }} placement="bottom">
              {props.children}
            </Popper>
          )}
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
            id: `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_COUNTRY_FIELD].name}`,
            label: t('company-register.account-user.country'),
            name: `${arrayField.name}.${index}.${arrayField.nestedFields[OWNER_COUNTRY_FIELD].name}`,
            variant: 'standard',
            helperText: isError(OWNER_COUNTRY_FIELD) && isErrorMessage(OWNER_COUNTRY_FIELD),
            error: isError(OWNER_COUNTRY_FIELD),
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
      </Grid>
    ) : null;

  const languageElement =
    type === AccountUserTypeEnum.ACCOUNT_REPRESENTATIVE ? (
      <Grid item xs={12} md={6}>
        <AutoCompleteField
          defaultValue={languages.find((language) => language.code === defaultValue) || null}
          value={languages.find((language) => language.code === defaultValue) || null}
          options={languages}
          getOptionLabel={(option) => option.name || ''}
          onChange={(_, value: any) =>
            setFieldValue(
              `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_LANGUAGE_FIELD].name}`,
              value.code,
            )
          }
          textFieldProps={{
            id: `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_LANGUAGE_FIELD].name}`,
            label: t('company-register.account-user.language'),
            name: `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_LANGUAGE_FIELD].name}`,
            variant: 'standard',
            helperText: isError(REPRESENTATIVE_LANGUAGE_FIELD) && isErrorMessage(REPRESENTATIVE_LANGUAGE_FIELD),
            error: isError(REPRESENTATIVE_LANGUAGE_FIELD),
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
      </Grid>
    ) : null;

  return (
    <Grid container rowSpacing={2} columnSpacing={3}>
      <Grid item xs={12}>
        <Box display="center" alignItems="center" justifyContent="space-between" flexWrap="nowrap">
          <Typography className={classes.title} component="h2">
            {title}
          </Typography>
          <div onClick={handleDeleteAccountUser} style={{ cursor: 'pointer' }}>
            <DeleteIcon />
          </div>
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_FIRST_NAME_FIELD].name}`}
          label={t('company-register.account-user.first-name')}
          variant="standard"
          helperText={
            isError(REPRESENTATIVE_OWNER_FIRST_NAME_FIELD) && isErrorMessage(REPRESENTATIVE_OWNER_FIRST_NAME_FIELD)
          }
          error={isError(REPRESENTATIVE_OWNER_FIRST_NAME_FIELD)}
          {...getFieldProps(
            `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_FIRST_NAME_FIELD].name}`,
          )}
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_LAST_NAME_FIELD].name}`}
          label={t('company-register.account-user.last-name')}
          variant="standard"
          helperText={
            isError(REPRESENTATIVE_OWNER_LAST_NAME_FIELD) && isErrorMessage(REPRESENTATIVE_OWNER_LAST_NAME_FIELD)
          }
          error={isError(REPRESENTATIVE_OWNER_LAST_NAME_FIELD)}
          {...getFieldProps(
            `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_LAST_NAME_FIELD].name}`,
          )}
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <TextField
          type="text"
          fullWidth
          id={`${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE__OWNER_EMAIL_FIELD].name}`}
          label={t('company-register.account-user.email')}
          variant="standard"
          helperText={isError(REPRESENTATIVE__OWNER_EMAIL_FIELD) && isErrorMessage(REPRESENTATIVE__OWNER_EMAIL_FIELD)}
          error={isError(REPRESENTATIVE__OWNER_EMAIL_FIELD)}
          {...getFieldProps(
            `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE__OWNER_EMAIL_FIELD].name}`,
          )}
          size="small"
        />
      </Grid>
      <Grid item xs={12} md={6} sx={{ marginTop: '8px' }}>
        <DateField
          {...getFieldProps(
            `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD].name}`,
          )}
          maxDate={new Date()}
          onChange={(date) => {
            if (date instanceof Date && new Date(date).toString() !== 'Invalid Date') {
              void setFieldValue(
                `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD].name}`,
                new Date(date).toUTCString(),
              );
            } else {
              void setFieldValue(
                `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD].name}`,
                '',
              );
            }
          }}
          textFieldProps={{
            label: t('company-register.account-user.birthday'),
            variant: 'standard',
            helperText:
              isErrorMessage(REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD) &&
              isErrorMessage(REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD),
            error: isErrorMessage(REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD) ? true : false,
            name: `${arrayField.name}.${index}.${arrayField.nestedFields[REPRESENTATIVE_OWNER_DATE_OF_BIRTH_FIELD].name}`,
            fullWidth: true,
            onBlur: handleBlur,
          }}
        />
      </Grid>

      {languageElement}
      {birthPlaceElement}
      {streeAndNumberElement}
      {houseNumberElement}
      {postalCodeElement}
      {cityElement}
      {nationalityElement}
      {countryElement}
    </Grid>
  );
};
