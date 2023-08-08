// Query types used while setting up the form data
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
