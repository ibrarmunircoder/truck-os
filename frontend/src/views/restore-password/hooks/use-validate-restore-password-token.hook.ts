import { gql } from '@apollo/client';
import { requestGql } from 'modules/common/utils/request-gql';
import { useCallback } from 'react';


export interface ValidateRestorePasswordToken {
  isValid: boolean,
  isExpired?: boolean
  isLoading: boolean,
  email?: string;
}

export interface UseValidateRestorePasswordToken {
  validateToken: (token: string) => Promise<ValidateRestorePasswordToken>
}

export const useValidateRestorePasswordToken = (): UseValidateRestorePasswordToken => {

  const validateToken = useCallback(async (token: string) => requestGql<ValidateRestorePasswordToken>({
      query: gql`
        query CheckUserRestorePasswordToken($token:String!){
          checkUserRestorePasswordToken(token:$token){
            isExpired
            isValid,
            email
          }
        }
      `,
      variables: {
        token,
      }
    }, null, 'checkUserRestorePasswordToken'), []);


  return {
    validateToken
  };
}
