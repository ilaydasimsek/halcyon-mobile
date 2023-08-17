import {
  getGenericPassword,
  resetGenericPassword,
  setGenericPassword,
} from 'react-native-keychain';
import { TAuth } from '../screens/auth/auth-query';

/*
  Parses and returns the saved credentials if there is any
*/
export const getUserCredentialsFromKeychain = async (): Promise<{
  email: string;
  token: string;
} | null> => {
  const credentials = await getGenericPassword();
  if (!credentials) {
    return null;
  }

  return {
    ...JSON.parse(credentials.username),
    ...JSON.parse(credentials.password),
  };
};

/*
  Saves the given auth object to keychain

  Warning: react-native-keychain doesn't support saving individual keys.
  That's why we stringify email & token and save them as the username value
*/
export const saveUserCredentialsToKeychain = async (auth: TAuth) => {
  await setGenericPassword(
    JSON.stringify({
      email: auth.payload.email,
    }),
    JSON.stringify({
      token: auth.token,
    }),
  );
};

/*
  Clears the saved data from keychain, should be used when user
  needs to logout or user is unauthorized
*/
export const clearKeychain = async () => {
  await resetGenericPassword();
};
