import {createSlice} from '@reduxjs/toolkit';

import {userLogin} from '../api/auth';

const initialState = {
  loading: false,
  user: null,
  isOnboarded: false,
  isAuthenticated: false,
  token: '',
  tokenExpiry: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    onboard: state => {
      state.isOnboarded = true;
    },
    login: (state, action) => {
      const {token, user} = action.payload;
      state.token = token;
      state.user = user;
      state.isAuthenticated = true;
      state.isOnboarded = true;
    },
    logout: state => {
      state.token = '';
      state.user = null;
      state.isAuthenticated = false;
      state.tokenExpiry = null;
    },
  },
  extraReducers(builder) {
    builder.addCase(userLogin.pending, state => {
      state.loading = true;
    });
    builder.addCase(userLogin.rejected, state => {
      state.loading = false;
    });
    builder.addCase(userLogin.fulfilled, state => {
      state.loading = false;
    });
  },
});

export const {login, logout, onboard} = authSlice.actions;

export default authSlice.reducer;
