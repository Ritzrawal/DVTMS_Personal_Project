import * as types from "../types/user";
import UserService from "../../services/User";
import { IUserResponse, IUserPagingInput } from "../../interfaces/IUser";

export const getUsers = (args: IUserPagingInput) => (dispatch: any) => {
  dispatch({
    type: types.USER_LIST_LOADING,
  });

  return UserService 
    .getUsers(args)
    .then((response: IUserResponse) => {
      dispatch({
        type: types.USER_LIST_SUCCESS,
        payload: {
          users: response.results,
          paging: {
            count: response.count,
            previous: response.previous,
            next: response.next,
          }
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: types.USER_LIST_FAILED,
        error: err.data,
      });
    });
}

