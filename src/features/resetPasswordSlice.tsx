import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';

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
const baseURL: string =
  'https://tupper-backend.herokuapp.com/api/user/reset-password  ';

export const resetPasswordFetch = createAsyncThunk(
  'users/resetPassword',
  async (userInformation: userInformation, thunkAPI) => {
    const {email, otp, password} = userInformation;
    const response = await fetch(baseURL, {
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
    });
    const data = await response.json();
    console.log('Reset Password Data:', data);
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
