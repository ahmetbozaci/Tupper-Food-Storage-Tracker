import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

const initialState = {
  status: '',
  message: '',
  loading: false,
  data: {},
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
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
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
    builder.addCase(loginUser.rejected, (state, action) => {
      const {message, status} = action.payload;
      state.loading = false;
      state.status = status;
      state.message = message;
    });
  },
});

export default userSlice.reducer;
