import { gql } from '@apollo/client';
import { AppDispatch } from 'configuration/redux/store';
import { fetchUserAction } from 'modules/users/users.slice';
import { useDispatch } from 'react-redux';

export interface UseGetUserHookInterface {
  fetchUser: (id: string) => void;
}

export const useFetchUser = (): UseGetUserHookInterface => {
  const dispatch = useDispatch<AppDispatch>();

  const fetchUser = (id: string) => {
    void dispatch(
      fetchUserAction({
        query: gql`
          query userQuery($id: ID!) {
            user(id: $id) {
              id
              email
              avatar
              firstName
              lastName
              locale
              active
              optedInAt
              timezone
              account {
                id
                companyName
                addressAddon
                phoneNumber
                bic
                iban
                bic
                city
                country
                registrationAuthority
                registrationNumber
                streetAndNumber
                vatId
                legalRepresentative
                solePower
                legalForm
                postalCode
                registrationAuthorityCity
                accountUsers {
                  data {
                    birthday
                    birthplace
                    city
                    country
                    email
                    firstName
                    houseNumber
                    id
                    language
                    lastName
                    nationality
                    postalCode
                    streetAndNumber
                    accountUserType
                    accountId
                  }
                }
              }
            }
          }
        `,
        variables: {
          id,
        },
      }),
    );
  };

  return {
    fetchUser,
  };
};
