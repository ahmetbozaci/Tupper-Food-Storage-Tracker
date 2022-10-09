/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';
import {createUserSuccess, createUserFailure} from './signUpReducer';

const baseURL = '';

interface User {
  name: string;
  email: string;
  password: string;
}

const createUser =
  (user: User) =>
  async (dispatch: any): Promise<void> => {
    const newUser = {
      name: user.name,
      email: user.email,
      password: user.password,
    };

    const response = await axios.post(baseURL, newUser);
    const {data} = response;
    console.log(data);
    // const currentUserName = data.user.name;
    // const currentUserId = data.user.id;
    // localStorage.setItem('currentUserName', currentUserName);
    // localStorage.setItem('currentUserId', currentUserId);
    // const {status, errors} = data;
    // if (status !== 'error') {
    //   dispatch(createUserSuccess(data));
    // } else {
    //   dispatch(createUserFailure(errors));
    // }
  };

export default createUser;
