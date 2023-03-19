import { AppDispatch } from 'configuration/redux/store';
import { settingsAccountQueryAction } from 'modules/account-settings/actions';
import { accountSettingsCurrentViewSelector, settingAccountSelector } from 'modules/account-settings/selectors';
import { useAuth } from 'modules/auth/hooks';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AccountInterface } from 'views/account-settings/interfaces';

interface UseAccountSettingsHookInterface {
  currentAccountSettingsView: number;
  account: AccountInterface;
}

export const useAccountSettings = (): UseAccountSettingsHookInterface => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useAuth();
  const currentAccountSettingsView = useSelector(accountSettingsCurrentViewSelector);
  const account = useSelector(settingAccountSelector);

  useEffect(() => {
    if (user) {
      void dispatch(settingsAccountQueryAction(user.id));
    }
  }, [dispatch]);

  return {
    currentAccountSettingsView,
    account,
  };
};
