import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useCallback } from 'react';


export interface ValidateTokenInterface {
  isValid: boolean;
  isExpired?: boolean;
  email?: string;
}

export interface UseValidateTokenInterface {
  validateToken: (token: string) => Promise<ValidateTokenInterface>
}

export const useValidateToken = (): UseValidateTokenInterface => {

  const validateToken = useCallback(async (token: string) => requestGql<ValidateTokenInterface>({
      query: gql`
        query CheckUserInviteToken($token:String!){
          checkUserInviteToken(token:$token){
            isExpired
            isValid,
            email
          }
        }
      `,
      variables: {
        token,
      }
    }, null, 'checkUserInviteToken'), []);


  return {
    validateToken
  };
}
