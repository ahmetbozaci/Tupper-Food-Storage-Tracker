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

const baseURL: string =
  'https://tupper-backend.herokuapp.com/api/user/forget-password';

export const forgotPasswordFetch = createAsyncThunk(
  'users/forgotPassword',
  async (userInformation: {email: string}, thunkAPI) => {
    const {email} = userInformation;
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
      }),
    });
    const data = await response.json();
    console.log('Enter Email Data:', data);
    if (data.status === 'success') {
      return data;
    } else {
      return thunkAPI.rejectWithValue(data);
    }
  },
);

const forgotPasswordSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(forgotPasswordFetch.pending, state => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      forgotPasswordFetch.fulfilled,
      (state, {payload}: PayloadAction<state>) => {
        const {status, message} = payload;
        if (status === 'success') {
          state.loading = false;
          state.status = status;
          state.message = message;
        } else {
          state.status = status;
          state.loading = false;
          state.message = message;
        }
      },
    );
    builder.addCase(forgotPasswordFetch.rejected, state => {
      state.loading = false;
      state.error = 'Error sending email data';
    });
  },
});

export default forgotPasswordSlice.reducer;
