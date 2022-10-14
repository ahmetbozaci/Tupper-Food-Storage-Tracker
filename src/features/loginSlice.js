import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  message: '',
  loading: false,
  data: {},
};

const baseURL = 'https://tupper-backend.herokuapp.com/api/user/login';

export const loginFetch = createAsyncThunk(
  'users/login',
  async (userInformation, thunkAPI) => {
    const {email, password} = userInformation;

    try {
      const response = await fetch(baseURL, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      console.log('data', data);
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
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginFetch.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginFetch.fulfilled, (state, action) => {
      const {status, message, data} = action.payload;
      const {email} = data;
      if (status === 'success') {
        state.loading = true;
        state.data.email = email;
        state.status = status;
        state.message = message;
      } else {
        state.status = status;
        state.loading = false;
        state.message = message;
      }
    });
    builder.addCase(loginFetch.rejected, (state, action) => {
      const {message, status} = action.payload;
      state.loading = false;
      state.status = status;
      state.message = message;
    });
  },
});

export default loginSlice.reducer;
