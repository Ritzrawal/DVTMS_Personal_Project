import * as types from '../types/user';
import { IUserState } from '../../interfaces/IUser';

const defaultState: IUserState = {
  listLoading: true,
  error: null,
  users: [],
  paging: {
    count: 0,
    previous: null,
    next: null,
  },
};

const user = (state: IUserState = defaultState, action: any) => {
  switch (action.type) {
    // List
    case types.USER_LIST_LOADING:
      return {
        ...state,
        listLoading: true,
        error: null,
      };

    case types.USER_LIST_SUCCESS:
      return {
        ...state,
        error: null,
        listLoading: false,
        users: action.payload.users,
        paging: {
          ...state.paging,
          ...action.payload.paging,
        }
      };

    case types.USER_LIST_FAILED:
      return {
        ...state,
        error: action.error,
        listLoading: false,
      };

    default:
      return state;
  }
};

export default user;
