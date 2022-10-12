/* eslint-disable no-undef */
import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  status: '',
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
      console.log('response', data);
      // if (response.status === 200) {
      //   localStorage.setItem('token', data.token);
      //   return data;
      // } else {
      //   return thunkAPI.rejectWithValue(data);
      // }
    } catch (e) {
      console.log('Error', e.response.data);
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    [loginUser.fulfilled]: (state, {payload}) => {
      console.log('payload', payload);
      state.email = payload.email;
      state.username = payload.name;
      state.isFetching = false;
      state.isSuccess = true;
      return state;
    },
    [loginUser.rejected]: (state, {payload}) => {
      console.log('payload', payload);
      state.isFetching = false;
      state.isError = true;
      state.errorMessage = payload.message;
    },
    [loginUser.pending]: state => {
      state.isFetching = true;
    },
  },
  // extraReducers: {
  //   [loginUser.fulfilled]: (state, {payload}) => {
  //     console.log('hello', payload);
  //     state.data.email = payload.email;
  //     state.status = payload.status;
  //     return state;
  //   },
  // },
  // extraReducers: builder => {
  //   builder.addCase(loginUser.pending, (state, action) => {
  //     state.loading = true;
  //     state.error = '';
  //   });

  //   builder.addCase(loginUser.fulfilled, (state, action) => {
  //     state.data.email = action.payload.email;
  //     state.loading = false;
  //   });
  //   builder.addCase(loginUser.rejected, (state, action) => {
  //     state.loading = false;
  //     state.error = 'Error fetching user data';
  //   });
  // },
  //   },
});

export default userSlice.reducer;
