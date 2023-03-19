import { useNotificationsCategoriesActions } from 'modules/notification-preferences/hook';
import {
  NotificationPreferencesTypeInterface,
  setUpdatePreferenceSuccessAction,
} from 'modules/notification-preferences/notification-preferences.slice';
import { notificationPreferencesSelector } from 'modules/notification-preferences/selector';
import { useCallback, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

interface UseNotificationItemCheckedInterfaceArg {
  type: NotificationPreferencesTypeInterface;
}

interface UseNotificationItemCheckedInterface {
  checkedAppNotification: boolean;
  checkedEmailNotification: boolean;
  checkedSwitch: boolean;
  handleSwitchChange(event: React.ChangeEvent<HTMLInputElement>): void;
  success: boolean;
  resetSuccess: () => void;
}

export const useNotificationTypeItem = ({
  type,
}: UseNotificationItemCheckedInterfaceArg): UseNotificationItemCheckedInterface => {
  const { toggleNotificationTypeUserPreference } = useNotificationsCategoriesActions();
  const { success } = useSelector(notificationPreferencesSelector);
  const dispatch = useDispatch();

  const preference = useMemo(() => type.userPreference, [type]);
  const checkedAppNotification = useMemo(
    () => (preference ? preference.web : type.defaultUserActiveWeb),
    [preference, type],
  );
  const checkedEmailNotification = useMemo(
    () => (preference ? preference.mail : type.defaultUserActiveMail),
    [preference, type],
  );
  const checkedSwitch = useMemo(
    () => checkedAppNotification && checkedEmailNotification,
    [checkedAppNotification, checkedEmailNotification],
  );

  const handleSwitchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const evtName = event.target.name;
      const checked = event.target.checked;
      const payload = {
        web: checkedAppNotification,
        mail: checkedEmailNotification,
        notificationTypeId: type.id,
        id: preference?.id,
      };

      switch (evtName) {
        case 'checkedSwitch': {
          payload.web = checked;
          payload.mail = checked;
          break;
        }
        case 'checkedAppNotifications': {
          payload.web = checked;
          break;
        }
        case 'checkedEmailNotifications': {
          payload.mail = checked;
          break;
        }
      }
      toggleNotificationTypeUserPreference(payload);
    },
    [checkedAppNotification, checkedEmailNotification, preference, type],
  );

  const resetSuccess = () => {
    dispatch(setUpdatePreferenceSuccessAction(false));
  };

  return {
    checkedAppNotification,
    checkedEmailNotification,
    checkedSwitch,
    handleSwitchChange,
    success,
    resetSuccess,
  };
};
