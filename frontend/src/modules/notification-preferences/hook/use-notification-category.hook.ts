import { useNotificationsCategoriesActions } from 'modules/notification-preferences/hook';
import { NotificationPreferencesTypeCategoryInterface } from 'modules/notification-preferences/notification-preferences.slice';
import { useCallback, useMemo } from 'react';

interface UseNotificationTypeCategoryInterfaceArg {
  category: NotificationPreferencesTypeCategoryInterface;
}

interface UseNotificationTypeCategoryInterface {
  checkedSwitch: boolean;
  handleSwitchChange(event: React.ChangeEvent<HTMLInputElement>): void;
}

export const useNotificationTypeCategory = ({
  category,
}: UseNotificationTypeCategoryInterfaceArg): UseNotificationTypeCategoryInterface => {
  const { toggleNotificationTypeUserPreference } = useNotificationsCategoriesActions();

  const checkedSwitch = useMemo(() => category.notificationTypes.every(
    ({ userPreference: preference, defaultUserActiveMail, defaultUserActiveWeb}) =>
      preference ? preference.mail && preference.web : defaultUserActiveMail &&  defaultUserActiveWeb
  ), [category]);

  const handleSwitchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const checked = event.target.checked;
      category.notificationTypes?.forEach((type) => {
        const preference = type.userPreference
        const payload = {
          web: checked,
          mail: checked,
          notificationTypeId: type.id,
          id: preference?.id,
        };
        toggleNotificationTypeUserPreference(payload);
      });
    },
    [category],
  );

  return {
    checkedSwitch,
    handleSwitchChange,
  };
};
