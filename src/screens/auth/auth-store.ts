import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TAuth } from './auth-query';

type TAuthState = {
  loggedIn?: boolean;
  user?: TAuth;
};

const initialState: TAuthState = {
  loggedIn: undefined,
  user: undefined,
};

const slice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    userLoggedIn: (state: TAuthState, action: PayloadAction<TAuth>) => {
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
