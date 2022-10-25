import {createAsyncThunk} from '@reduxjs/toolkit';
import {baseURL} from '../config';
import {requestTimeout} from '../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LoginData, SignupData} from '../interfaces/Auth';

export const userLogin = createAsyncThunk(
  'user/login',
  async (request_body: LoginData, thunkAPI) => {
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
      // Add data.token to storage
      AsyncStorage.setItem('token', data.token);
      return thunkAPI.fulfillWithValue(data);
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  },
);

export const userSignUp = createAsyncThunk(
  'user/signup',
  async (userInformation: SignupData, thunkAPI) => {
    const {name, email, zipCode, password} = userInformation;
    const response = await requestTimeout(
      fetch(`${baseURL}/user/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          zipCode,
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
