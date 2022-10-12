/* eslint-disable @typescript-eslint/no-unused-vars */
// import axios from 'axios';
import {Dispatch} from 'redux';
import {createUserSuccess} from './signUpReducer';
import {Action} from './types';

const baseURL = 'https://tupper-backend.herokuapp.com/api/user/signup';

interface User {
  name: string;
  email: string;
  zipCode: string;
  password: string;
}

const createUser = (user: User) => async (dispatch: Dispatch<Action>) => {
  const newUser = {
    name: user.name,
    email: user.email,
    zipCode: user.zipCode,
    password: user.password,
  };

  const response = await axios.post(baseURL, newUser);
  const {data} = response;
  console.log('data:', data);
  dispatch(createUserSuccess(data));

  // const currentUserName = data.user.name;
  // const currentUserId = data.user.id;
  // localStorage.setItem('currentUserName', currentUserName);
  // localStorage.setItem('currentUserId', currentUserId);
  // const {status, errors} = data;
  // if (status !== 'error') {
  // } else {
  //   dispatch(createUserFailure(errors));
  // }
};

export default createUser;
