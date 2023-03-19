import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { MenuItem, Select, SelectChangeEvent } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { updateAuthUserAction } from 'modules/auth/auth.slice';
import { useTranslation } from 'modules/common/hooks';
import { getSelectedLocale, saveSelectedLocale, useLocales } from 'modules/locale';
import { useUserUpdate } from 'modules/users/hooks';
import React, { FunctionComponent, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAccountBasicSettingsInfo, useAccountCompanyDetails } from 'views/account-settings/hooks';
import { useLanguageSettingsStyles } from 'views/account-settings/partials/language-settings/language-settings.styles';

interface AccountCompanyDetailsPropsInterface {
  isDesktop?: boolean;
}

export const LanguageSettings: FunctionComponent<AccountCompanyDetailsPropsInterface> = ({
  isDesktop,
}): React.ReactElement => {
  const classes = useLanguageSettingsStyles({ isDesktop });
  const { localeOptions, setCurrentLocale } = useLocales();
  const { accountRecord: account, handleBackButtonClick } = useAccountCompanyDetails();
  const selectedLocale = getSelectedLocale();
  const { user } = useAccountBasicSettingsInfo();
  const [selectedLanguage, setSelectedLanguage] = useState(selectedLocale === null ? user.locale : selectedLocale);
  const { updateUser } = useUserUpdate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleLanguageChange = useCallback(
    async (e: SelectChangeEvent<string>) => {
      const locale = e.target?.value;
      saveSelectedLocale(locale);
      const data = await updateUser(user.id, { locale: locale.toString() });
      await dispatch(updateAuthUserAction(data));
      await setCurrentLocale(locale);
      setSelectedLanguage(locale);
    },
    [setCurrentLocale],
  );

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography component="h1" className={classes.accountCompanyDetailsPageTitle}>
            <div className={classes.accountCompanyDetailsBackIcon} onClick={handleBackButtonClick}>
              <ChevronLeftIcon />
            </div>
            <span>{t('account-settings.language')}</span>
          </Typography>
          {!isDesktop &&
            <Typography component="h2" className={classes.accountCompanyDetailsPageSubtitle}>
              {account && account.companyName}
            </Typography>}
        </Grid>
      </Grid>
      <Grid container>
        <Grid item xs={12} padding={{ xs: 3, md: '0px 24px 24px 24px' }}>
          <Typography component="h2" className={classes.dropdownTitle} paddingLeft={0}>
            {t('account-settings.choose-language')}
          </Typography>
          <Select
            fullWidth
            id="language-select"
            value={selectedLanguage}
            className={classes.languageSelect}
            onChange={handleLanguageChange}
            MenuProps={{
              classes: {
                paper: classes.paperBackground
              }
            }}
          >
            {
              localeOptions.map((localeOption, index) => (
                <MenuItem key={index} value={localeOption.id}>{localeOption.label}</MenuItem>
              ))
            }
          </Select>
        </Grid>
      </Grid>
    </Box>
  );
};
