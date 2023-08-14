// Query types used while setting up the form data
import { gql, useMutation } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { saveUserCredentialsToKeychain, clearKeychain } from '@keychain';
import { userLoggedIn, userLoggedOut } from './auth-store';

export type TLoginQuery = {
  email: string;
  password: string;
};

type TUser = {
  email: string;
};

type TLoginResponse = {
  token: string;
  payload: TUser;
};

export type TAuth = TLoginResponse;

export const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      payload
    }
  }
`;

export const SIGNUP_MUTATION = gql`
  mutation signUp($email: String!, $password: String!) {
    signUp(email: $email, password: $password) {
      token
      payload
    }
  }
`;

export const REFRESH_TOKEN_MUTATION = gql`
  mutation refresh($token: String!) {
    refreshToken(token: $token) {
      payload
    }
  }
`;
export const useLogin = () => {
  const dispatch = useDispatch();
  return useMutation<{ login: TLoginResponse }>(LOGIN_MUTATION, {
    async onCompleted(data) {
      await saveUserCredentialsToKeychain(data.login);
      dispatch(userLoggedIn(data.login));
    },
  });
};

export const useSignUp = () => {
  const dispatch = useDispatch();
  return useMutation<{ signUp: TLoginResponse }>(SIGNUP_MUTATION, {
    async onCompleted(data) {
      await saveUserCredentialsToKeychain(data.signUp);
      dispatch(userLoggedIn(data.signUp));
    },
  });
};

export const useLogoutMutation = () => {
  // TODO add logout request if needed
  const dispatch = useDispatch();
  return {
    logout: async () => {
      await clearKeychain();
      dispatch(userLoggedOut());
    },
  };
};
