import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  message: '',
  loading: false,
};

const baseURL = 'https://tupper-backend.herokuapp.com/api/user/signup';

export const signupFetch = createAsyncThunk(
  'users/signup',
  async (userInformation, thunkAPI) => {
    const {name, email, zipCode, password} = userInformation;
    try {
      const response = await fetch(baseURL, {
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
      });
      const data = await response.json();
      console.log('Signup Data:', data);

      if (data.status === 'success') {
        //! Add local storage
        return data;
      } else {
        return thunkAPI.rejectWithValue(data);
      }
    } catch (e) {
      thunkAPI.rejectWithValue(e.response.data);
    }
  },
);
const signupSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(signupFetch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(signupFetch.fulfilled, (state, action) => {
      const {status, message} = action.payload;
      if (status === 'success') {
        state.loading = true;
        state.status = status;
        state.message = message;
      } else {
        state.status = status;
        state.loading = false;
        state.message = message;
      }
    });
    builder.addCase(signupFetch.rejected, (state, action) => {
      const {message, status} = action.payload;
      state.loading = false;
      state.status = status;
      state.message = message;
    });
  },
});

export default signupSlice.reducer;
