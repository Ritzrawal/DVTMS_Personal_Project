import querystring from 'query-string';

import Http from "./Http";
import { IUserResponse, IUserPagingInput, IUserAddInput, IUser } from "../interfaces/IUser";

const http = new Http();

export default class UserService {
  static getUsers(args: IUserPagingInput) {
    let query = querystring.stringify(args);
    return http.get<IUserResponse>({
      endpoint: `api/v1/user/?${query}`,
    })
  }

  static addUser(args: IUserAddInput) {
    return http.post<IUser>({
      endpoint: 'api/v1/user/onboard/',
      payload: args,
    })
  }
   static activateUser(args: string) {
    return http.post<IUser>({
      endpoint: `api/v1/user/${args}/activate/`,
    })
  }

  static deactivateUser(args: string) {
    return http.post<IUser>({
      endpoint: `api/v1/user/${args}/deactivate/`,
    })
  }

}

