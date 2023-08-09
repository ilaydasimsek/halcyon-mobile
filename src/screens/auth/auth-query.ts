// Query types used while setting up the form data
import { gql } from '@apollo/client';

export type TLoginQuery = {
  email: string;
  password: string;
};

export type TRegisterQuery = {
  name: string;
  email: string;
  password: string;
};

type TLoginResponse = {
  accessToken: string;
  userId: string;
};

export type TAuth = TLoginResponse & {
  email: string;
};

export const TEST_QUERY = gql`
  query a {
    test(firstName: "ilayda", lastName: "simsek") {
      fullName
    }
  }
`;
