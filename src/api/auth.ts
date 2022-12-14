import { createAsyncThunk } from '@reduxjs/toolkit';
import { baseURL } from '../config';
import { requestTimeout } from '../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoginData, SignupData } from '../interfaces/Auth';
import { fetchStorage } from './asyncStorage';

export const userLogin = createAsyncThunk(
  'user/login',
  async (request_body: LoginData, thunkAPI) => {
    const { email, password } = request_body;

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
    // console.log('response', response);
    const data = await response.json();
    // console.log('data', data);
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
    const { name, email, zipCode, password } = userInformation;
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
      // Add data.token to storage
      AsyncStorage.setItem('token', data.token);
      return thunkAPI.fulfillWithValue(data);
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  },
);

export const saveTokenToDB = async (notificationToken: string) => {
  const token = await fetchStorage('token');
  const response = await requestTimeout(
    fetch(`${baseURL}/user/save-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        token: notificationToken,
      }),
    }),
  );
  // console.log('response', response);
  if (!response.ok) {
    const resData = await response.json();
    console.log('response.error', resData);
    throw new Error(resData);
  }
  const resData = await response.json();
  // console.log('response.success', resData);
  return resData;
};

export const removeNotificationToken = async () => {
  const token = await fetchStorage('token');
  await requestTimeout(
    fetch(`${baseURL}/user/remove-token`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }),
  );
  // if (!response.ok) {
  //   const resData = await response.json();
  //   console.log('response.error', resData);
  //   throw new Error(resData);
  // }
  // const resData = await response.json();
  // console.log('response.success', resData);
};
