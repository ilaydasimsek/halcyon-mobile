import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { userLoggedIn, userLoggedOut } from '../screens/auth/auth-store';
import { getUserCredentialsFromKeychain } from './utils';

export const useSetupCredentialsFromKeychain = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        const userCredentials = await getUserCredentialsFromKeychain();
        if (userCredentials) {
          dispatch(userLoggedIn(userCredentials));
        } else {
          dispatch(userLoggedOut());
        }
      } catch (error) {
        dispatch(userLoggedOut());
      }
    })();
  }, [dispatch]);
};
