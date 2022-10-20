import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseURL} from '../config';
import {requestTimeout} from '../utils/network';

export const userLogin = createAsyncThunk(
  'user/login',
  async (request_body, thunkAPI) => {
    const {email, password} = request_body;

    const response = await requestTimeout(
      fetch(`${baseURL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }),
    );
    const data = await response.json();
    if (data.status === 'success') {
      return thunkAPI.fulfillWithValue(data);
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  },
);
