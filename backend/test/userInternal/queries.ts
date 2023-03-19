export const deactivateUser = `
mutation DeactivateUser($id: ID!){
  deactivateUser(id: $id){
    id
  }
}`;

export const activateUser = `
mutation ActivateUser($id: ID!){
  activateUser(id: $id){
    id
  }
}`;

export const loginUser = `
mutation Login($input: LoginDto!){
  login(input: $input){
    accessToken
  }
}`;

export const providerLogin = `
mutation ProviderLogin($input: ProviderLoginDto!){
  providerLogin(input: $input){
    userId
  }
}`;

export const forgotPassword = `
mutation ForgotPassword($input: ForgotPasswordDto!){
  forgotPassword(input: $input)
}`;

export const providerDisconnet = `mutation ProviderDisconnet($input: ProviderDisconnectDto!){
  providerDisconnect(input: $input)
}`;

export const refreshToken = `mutation RefreshToken{
  refreshTokens{
    refreshToken
  }
}`;

export const accountActivate = `
mutation accountActivateMutation($data: AccountActivateDto!) {
  accountActivate(input: $data) {
    accessToken
    refreshToken
    platformAccessToken
  }
}
`;

export const checkUserToken = `
query CheckUserRestorePasswordToken($token:String!){
  checkUserRestorePasswordToken(token:$token){
    isExpired
    isValid,
    email
  }
}
`;

export const usersQuery = `
  query($filter: UserFilterArgType) {
    users(filter: $filter) {
      data {
        id
        email
        phone
        firstName
        lastName
        locale
        timezone
        optedInAt
      }
    }
  }
`;
