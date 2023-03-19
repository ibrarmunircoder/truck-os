import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { UserInviteInterface } from 'modules/user-invites';
import { useCallback } from 'react';
interface SuccessInterface {
  email: string;
}
interface ErrorInterface {
  email: string;
  error: string;
}
export interface UseSendInvitesResponse {
  success: SuccessInterface[];
  errors: ErrorInterface[];
}
export interface UseSendInvitesInterface {
  sendInvites: (userInvites: UserInviteInterface[]) => Promise<UseSendInvitesResponse>;
}

interface UseSendInvitesHookParams {
  userId: string;
  locale: string;
}

export const useSendInvites = ({ userId, locale }: UseSendInvitesHookParams): UseSendInvitesInterface => {
  const sendInvites = useCallback(
    async (userInvites: UserInviteInterface[]) =>
      requestGql<UseSendInvitesResponse>(
        {
          mutation: gql`
            mutation CreateUserInvites($userInvites: UserInvitesCreateDto!, $locale: String!) {
              sendUserInvites(userInvites: $userInvites, locale: $locale) {
                success {
                  email
                }
                errors {
                  error
                  email
                }
              }
            }
          `,
          variables: {
            userInvites: { userInvites: userInvites.map((invite) => ({ ...invite, createdByUserId: userId })) },
            locale,
          },
        },
        null,
        'sendUserInvites',
      ),
    [],
  );

  return {
    sendInvites,
  };
};
