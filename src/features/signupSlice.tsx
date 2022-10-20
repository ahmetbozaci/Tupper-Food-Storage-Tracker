import {createSlice} from '@reduxjs/toolkit';
import {userSignUp} from '../api/auth';

const initialState = {
  loading: false,
};

const signupSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(userSignUp.pending, state => {
      state.loading = true;
    });
    builder.addCase(userSignUp.rejected, state => {
      state.loading = false;
    });
    builder.addCase(userSignUp.fulfilled, state => {
      state.loading = false;
    });
  },
});

export default signupSlice.reducer;
