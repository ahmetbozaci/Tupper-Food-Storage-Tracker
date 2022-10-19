import {configureStore} from '@reduxjs/toolkit';
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import forgotPasswordSlice from './forgotPasswordSlice';
import loginSlice from './loginSlice';
import resetPasswordSlice from './resetPasswordSlice';
import signupSlice from './signupSlice';

const store = configureStore({
  reducer: {
    login: loginSlice,
    signup: signupSlice,
    forgotPassword: forgotPasswordSlice,
    resetPassword: resetPasswordSlice,
  },
});
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
