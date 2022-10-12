import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

interface UserState {
  data: User | null;
  loading: boolean;
  error: string;
}

const initialState: UserState = {
  data: null,
  loading: false,
  error: '',
};

const baseURL = '';

export const fetchUser = createAsyncThunk(
  'fetchUser',
  async (email: string) => {
    console.log(email);
    const {data} = await axios.post(baseURL, userInformation);
    return data;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchUser.pending, (state, action) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchUser.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.data = action.payload;
        state.loading = false;
      },
    );
    builder.addCase(fetchUser.rejected, (state, action) => {
      state.loading = false;
      state.error = 'Error fetching user data';
    });
  },
});

export interface Data {
  id: string;
  name: string;
  email: string;
  password: string;
  zipCode: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  status: string;
  message: string;
  token: string;
  data: Data;
}

export default userSlice.reducer;
