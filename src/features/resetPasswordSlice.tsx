import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {baseURL} from '../config';
import {requestTimeout} from '../utils/network';
interface state {
  status: string;
  message: string;
  error: string;
  loading: boolean;
}

const initialState: state = {
  status: '',
  message: '',
  error: '',
  loading: false,
};

interface userInformation {
  email: string;
  otp: string;
  password: string;
}

export const resetPasswordFetch = createAsyncThunk(
  'users/resetPassword',
  async (userInformation: userInformation, thunkAPI) => {
    console.log('i was called');
    const {email, otp, password} = userInformation;
    const response = await requestTimeout(
      fetch(`${baseURL}/user/reset-password`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          otp,
          password,
        }),
      }),
    );
    // console.log('response', response);
    const data = await response.json();
    if (data.status === 'success') {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  },
);

const resetPasswordSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(resetPasswordFetch.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      resetPasswordFetch.fulfilled,
      (state, {payload}: PayloadAction<state>) => {
        const {status, message} = payload;
        if (status === 'success') {
          state.loading = true;
          state.status = status;
          state.message = message;
        } else {
          state.status = status;
          state.loading = false;
          state.message = message;
        }
      },
    );
    builder.addCase(resetPasswordFetch.rejected, state => {
      state.loading = false;
      state.error = 'Error sending email data';
    });
  },
});

export default resetPasswordSlice.reducer;
