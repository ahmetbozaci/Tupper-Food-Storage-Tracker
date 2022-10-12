/* eslint-disable @typescript-eslint/no-unused-vars */
import {Action, ActionType} from './types';
import {Dispatch} from 'redux';
const CREATE_USER_SUCCESS = 'colab14/users/CREATE_USER_SUCCESS';
// const CREATE_USER_FAILURE = 'colab14/users/CREATE_USER_FAILURE';

interface initialStateInterface {
  user: Array<User>;
  status: boolean;
}

interface User {
  name: string;
}

const initialState: initialStateInterface = {
  user: [],
  status: false,
};

//! Reducer
const reducer = (state = {initialState}, action: Action) => {
  const {payload} = action;
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        user: payload,
        status: true,
      };
    // case CREATE_USER_FAILURE:
    //   return {
    //     ...state,
    //     errors: payload,
    //   };
    default:
      return state;
  }
};

//! Action Creator
// export const createUserSuccess = (apiState: any) => ({
//   type: CREATE_USER_SUCCESS,
//   payload: apiState,
// });

export const createUserSuccess = (apiState: string) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: ActionType.CREATE_USER_SUCCESS,
      payload: apiState,
    });
  };
};

// export const createUserFailure = (apiState: string) => {
//   return (dispatch: Dispatch<Action>) => {
//     dispatch({
//       type: ActionType.CREATE_USER_FAILURE,
//       payload: apiState,
//     });
//   };
// };

// export const createUserFailure = (error: any) => ({
//   type: CREATE_USER_FAILURE,
//   payload: {error},
// });
export default reducer;
