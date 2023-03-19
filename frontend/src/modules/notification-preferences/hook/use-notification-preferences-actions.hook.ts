import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { ToggleNotificationPreferenceActionVariablesInterface } from 'modules/notification-preferences/actions';
import {
  toggleNotificationPreferenceAction,
} from 'modules/notification-preferences/notification-preferences.slice';
import { useDispatch } from 'react-redux';

export interface UseNotificationsActionsInterface {
  toggleNotificationTypeUserPreference: (vars: ToggleNotificationPreferenceActionVariablesInterface) => void;
}

export const useNotificationsCategoriesActions = (): UseNotificationsActionsInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const toggleNotificationTypeUserPreference = (variables) => {
    void dispatch(
      toggleNotificationPreferenceAction({
        mutation: gql`
          mutation UpsertNotificationTypeUserPreference(
            $web: Boolean!
            $mail: Boolean!
            $notificationTypeId: ID!
            $id: ID
          ) {
            upsertNotificationTypeUserPreference(
              notificationTypeUserPreference: {
                id: $id
                web: $web
                mail: $mail
                notificationTypeId: $notificationTypeId
              }
            ) {
              id
              web
              mail
              key
              userId
              notificationTypeId
            }
          }
        `,
        variables,
      }),
    );
  };

  return { toggleNotificationTypeUserPreference };
};
