import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { fetchCategoriesAction } from 'modules/notification-preferences/notification-preferences.slice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export interface UseNotificationsActionsInterface {
}

export const useNotificationsCategoriesLoader = (): UseNotificationsActionsInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const loadNotificationCategories = () => {
    void dispatch(
      fetchCategoriesAction({
        query: gql`
          query NotificationTypeCategories {
            notificationTypeCategories {
              data {
                id
                key
                description
                notificationTypes {
                  data {
                    id
                    key
                    description
                    defaultUserActiveWeb
                    defaultUserActiveMail
                    notificationTypeUserPreferences {
                      data {
                        id
                        key
                        web
                        mail
                        userId
                        notificationTypeId
                      }
                    }
                  }
                }
              }
            }
          }
        `,
        variables: {},
      }),
    );
  };

  useEffect(() => {
    loadNotificationCategories()
  }, []);

  return {}
};
