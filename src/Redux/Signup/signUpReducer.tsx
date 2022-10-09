const CREATE_USER_SUCCESS = 'colab14/users/CREATE_USER_SUCCESS';
const CREATE_USER_FAILURE = 'colab14/users/CREATE_USER_FAILURE';

const initialState = {
  user: [],
  status: false,
};

const reducer = (state = initialState, action: {type?: any; payload?: any}) => {
  const {payload} = action;
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        user: payload,
        status: true,
      };
    case CREATE_USER_FAILURE:
      return {
        ...state,
        errors: payload.error,
      };
    default:
      return state;
  }
};

export const createUserSuccess = (apiState: any) => ({
  type: CREATE_USER_SUCCESS,
  payload: apiState,
});
export const createUserFailure = (error: any) => ({
  type: CREATE_USER_FAILURE,
  payload: {error},
});
export default reducer;
