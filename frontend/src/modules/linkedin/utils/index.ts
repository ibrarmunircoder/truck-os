import { TokenSet } from 'next-auth';
import { LinkedInProfile } from 'next-auth/providers/linkedin'

const LINKEDIN_API_V2_URL = 'https://api.linkedin.com/v2'

export const getLinkedinEmailAddress = async (accessToken: string): Promise<string> => {
  const url = `${LINKEDIN_API_V2_URL}/emailAddress?q=members&projection=(elements*(handle~))`
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`
    },
  });
  const data = await response.json()

  return data?.elements?.[0]?.['handle~']?.emailAddress
}

export const processLinkedinProfile = async (profile: LinkedInProfile, tokens: TokenSet): Promise<{
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
}> => {
  const email = await getLinkedinEmailAddress(tokens.access_token as string)

  return {
    id: profile.id as string,
    firstName: profile.localizedFirstName as string,
    lastName: profile.localizedLastName as string,
    email,
    avatar: profile.profilePicture?.["displayImage~"]?.elements?.[0]?.identifiers?.[0]?.identifier,
  }
}
