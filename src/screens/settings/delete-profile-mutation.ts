import { gql, useMutation } from '@apollo/client';
import { useLogoutMutation } from '../auth/auth-query.ts';
import Toast from 'react-native-simple-toast';

const DELETE_PROFILE_MUTATION = gql`
  mutation deleteAccount {
    deleteAccount {
      ok
    }
  }
`;

export const useDeleteProfileMutation = () => {
  const useLogout = useLogoutMutation();
  return useMutation<{ result: { ok: boolean } }>(DELETE_PROFILE_MUTATION, {
    async onCompleted() {
      await useLogout.logout();
      Toast.show('Your profile has been deleted.', 2);
    },
  });
};
