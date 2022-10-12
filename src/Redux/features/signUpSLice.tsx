/* eslint-disable @typescript-eslint/no-unused-vars */
import {createSlice, PayloadAction, createAsyncThunk} from '@reduxjs/toolkit';
// import axios from 'axios';
const baseURL = 'https://tupper-backend.herokuapp.com/api/user/signup';

export const signUp = createAsyncThunk(
  'signUp',
  async (user, {getState, rejectWithValue}) => {
    console.log(getState());
    try {
      const newUser = {
        name: user.name,
        email: user.email,
        zipCode: user.zipCode,
        password: user.password,
      };

      const {data} = await axios.post(baseURL, newUser);
      console.log('data:', data);
      // dispatch(createUserSuccess(data));

      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  },
);

type InitialState = {
  user: Array<User>;
};
interface User {
  name: string;
  email: string;
  zipCode: string;
  password: string;
}
const initialState: InitialState = {
  //! It can change
  user: [],
};

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    success: (state, action: PayloadAction<User>) => {
      state.user.push(action.payload); //! It can change
    },
  },
});

export default signUpSlice.reducer;
export const {success} = signUpSlice.actions;
