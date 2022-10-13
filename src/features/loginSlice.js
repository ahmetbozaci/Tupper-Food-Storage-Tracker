/* eslint-disable no-undef */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
  error: '',
  data: {
    email: '',
  },
};

const baseURL = 'https://tupper-backend.herokuapp.com/api/user/login';

export const loginUser = createAsyncThunk(
  'users/login',
  async (userInformation, thunkAPI) => {
    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userInformation.email,
          password: userInformation.password,
        }),
      });
      const data = await response.json();
      return data;
      // if (response.status === 200) {
      //   localStorage.setItem('token', data.token);
      //   return data;
      // } else {
      //   return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      // console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, {payload}) => {
      if (payload.status === 'fail') {
        state.error = payload.status;
        state.loading = false;
      } else {
        console.log('state1', payload);
        state.data.email = payload.data.email;
        state.status = payload.status;
        console.log('state1', state);
      }
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      console.log(action);
      state.loading = false;
    });
  },
});

export default userSlice.reducer;
