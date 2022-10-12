export enum ActionType {
  CREATE_USER_SUCCESS = 'colab14/users/CREATE_USER_SUCCESS',
  // CREATE_USER_FAILURE = 'colab14/users/CREATE_USER_FAILURE',
}

interface CreateUserSuccess {
  type: ActionType.CREATE_USER_SUCCESS;
  payload: string;
}

// interface CreateUserFailure {
//   type: ActionType.CREATE_USER_FAILURE;
//   payload: string;
// }
export type Action = CreateUserSuccess;
