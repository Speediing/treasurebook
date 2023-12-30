import { cookies } from 'next/headers';

export type Session = {
  customer_authorization_code_token: string;
  expires_in: string;
  id_token: string;
  refresh_token: string;
  accessToken: string;
};

export const getSession = (): Session => {
  const auth = cookies().get('auth');
  if (!auth)
    return {
      customer_authorization_code_token: '',
      expires_in: '',
      id_token: '',
      refresh_token: '',
      accessToken: ''
    };
  const authJson = JSON.parse(auth?.value || '');
  return authJson;
};
