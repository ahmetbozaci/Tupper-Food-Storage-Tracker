import {configureStore} from '@reduxjs/toolkit';
import signUpReducer from '../Redux/Signup/signUpReducer';

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
  },
});

export default store;
