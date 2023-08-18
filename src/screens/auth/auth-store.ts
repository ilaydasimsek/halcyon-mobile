import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TAuthState = {
  loggedIn?: boolean;
  user?: {
    email: string;
    token: string;
  };
};

const initialState: TAuthState = {
  loggedIn: undefined,
  user: undefined,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn: (
      state: TAuthState,
      action: PayloadAction<{
        email: string;
        token: string;
      }>,
    ) => {
      state.loggedIn = true;
      state.user = action.payload;
    },
    userLoggedOut: (state: TAuthState) => {
      state.loggedIn = false;
    },
  },
});

export const { userLoggedIn, userLoggedOut } = slice.actions;
export default slice.reducer;
